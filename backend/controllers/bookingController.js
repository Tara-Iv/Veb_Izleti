import asyncHandler from '../middleware/asyncHandler.js';
import Booking from '../models/bookingModel.js';
import Tour from '../models/tourModel.js';

const addBooking = asyncHandler(async (req, res) => {
    const { tourId, numPersons, travelDate, contactPhone } = req.body;

    const tour = await Tour.findById(tourId);
    if (!tour) {
        res.status(404);
        throw new Error('Izlet nije pronađen');
    }

    if (tour.availableSpots < numPersons) {
        res.status(400);
        throw new Error('Nema dovoljno slobodnih mesta');
    }

    const totalPrice = tour.price * numPersons;

    const booking = await Booking.create({
        user: req.user._id,
        tour: tour._id,
        tourName: tour.name,
        tourImage: tour.image,
        price: tour.price,
        numPersons,
        totalPrice,
        travelDate,
        contactPhone,
        status: 'pending',
    });

    tour.availableSpots -= numPersons;
    await tour.save();

    res.status(201).json(booking);
});

const getMyBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.find({ user: req.user._id })
        .populate('tour', 'name image location duration');
    res.status(200).json(bookings);
});

const getBookingById = asyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id)
        .populate('user', 'name email')
        .populate('tour', 'name image location duration');
    if (booking) {
        res.status(200).json(booking);
    } else {
        res.status(404);
        throw new Error('Rezervacija nije pronađena');
    }
});

const cancelBooking = asyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (booking) {
        if (booking.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
            res.status(401);
            throw new Error('Nije autorizovano');
        }
        if (booking.status === 'cancelled') {
            res.status(400);
            throw new Error('Rezervacija je već otkazana');
        }

        const tour = await Tour.findById(booking.tour);
        if (tour) {
            tour.availableSpots += booking.numPersons;
            await tour.save();
        }
        booking.status = 'cancelled';
        const updated = await booking.save();
        res.status(200).json(updated);
    } else {
        res.status(404);
        throw new Error('Rezervacija nije pronađena');
    }
});

const confirmBooking = asyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (booking) {
        booking.status = 'confirmed';
        const updated = await booking.save();
        res.status(200).json(updated);
    } else {
        res.status(404);
        throw new Error('Rezervacija nije pronađena');
    }
});

const getBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.find({}).populate('user', 'name email');
    res.status(200).json(bookings);
});

const deleteBooking = asyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (booking) {
        if (booking.status !== 'cancelled') {
            res.status(400);
            throw new Error('Možete obrisati samo otkazane rezervacije');
        }
        await Booking.deleteOne({ _id: booking._id });
        res.status(200).json({ message: 'Rezervacija obrisana' });
    } else {
        res.status(404);
        throw new Error('Rezervacija nije pronađena');
    }
});

const completeExpiredBookings = asyncHandler(async (req, res) => {
    const today = new Date();
    const result = await Booking.updateMany(
        {
            status: 'confirmed',
            travelDate: { $lt: today },
        },
        { $set: { status: 'completed' } }
    );
    res.status(200).json({ message: `${result.modifiedCount} rezervacija označeno kao završeno` });
});

export { addBooking, getMyBookings, getBookingById, cancelBooking, confirmBooking, getBookings, deleteBooking, completeExpiredBookings };
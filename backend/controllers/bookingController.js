import asyncHandler from '../middleware/asyncHandler.js';
import Booking from '../models/bookingModel.js';
import Tour from '../models/tourModel.js';

// Provera slobodnih mesta za određeni izlet i datum
const getTourAvailability = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { date } = req.query;

    if (!date) {
        res.status(400);
        throw new Error('Datum je obavezan');
    }

    const tour = await Tour.findById(id);
    if (!tour) {
        res.status(404);
        throw new Error('Izlet nije pronađen');
    }

    const travelDate = new Date(date);

    const existingBookings = await Booking.find({
        tour: id,
        travelDate,
        status: { $in: ['pending', 'confirmed'] },
    });

    const bookedSpots = existingBookings.reduce((sum, b) => sum + b.numPersons, 0);
    const availableSpots = Math.max(tour.maxGroupSize - bookedSpots, 0);

    res.status(200).json({
        maxGroupSize: tour.maxGroupSize,
        bookedSpots,
        availableSpots,
    });
});

const addBooking = asyncHandler(async (req, res) => {
    const { tourId, numPersons, travelDate, contactPhone } = req.body;

    const tour = await Tour.findById(tourId);
    if (!tour) {
        res.status(404);
        throw new Error('Izlet nije pronađen');
    }

    const date = new Date(travelDate);

    const existingBookings = await Booking.find({
        tour: tourId,
        travelDate: date,
        status: { $in: ['pending', 'confirmed'] },
    });

    const bookedSpots = existingBookings.reduce((sum, b) => sum + b.numPersons, 0);
    const availableSpots = tour.maxGroupSize - bookedSpots;

    if (availableSpots < numPersons) {
        res.status(400);
        throw new Error(`Nema dovoljno slobodnih mesta za izabrani datum. Slobodno mesta: ${availableSpots}`);
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
        travelDate: date,
        contactPhone,
        status: 'pending',
    });

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
        if (booking.status !== 'cancelled' && booking.status !== 'completed') {
            res.status(400);
            throw new Error('Možete obrisati samo otkazane ili završene rezervacije');
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

const createTourReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
        res.status(404);
        throw new Error('Rezervacija nije pronađena');
    }

    if (booking.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Nije autorizovano');
    }

    if (booking.status !== 'completed') {
        res.status(400);
        throw new Error('Možete oceniti samo realizovane izlete');
    }

    if (booking.rated) {
        res.status(400);
        throw new Error('Već ste ocenili ovaj izlet');
    }

    const tour = await Tour.findById(booking.tour);
    if (!tour) {
        res.status(404);
        throw new Error('Izlet nije pronađen');
    }

    const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
    };

    tour.reviews.push(review);
    tour.numReviews = tour.reviews.length;
    tour.rating =
        Math.round(
            (tour.reviews.reduce((acc, item) => acc + item.rating, 0) / tour.reviews.length) * 10
        ) / 10;

    await tour.save();

    booking.rated = true;
    await booking.save();

    res.status(201).json({ message: 'Recenzija dodata', rating: tour.rating, numReviews: tour.numReviews });
});

export {
    addBooking,
    getMyBookings,
    getBookingById,
    cancelBooking,
    confirmBooking,
    getBookings,
    deleteBooking,
    completeExpiredBookings,
    getTourAvailability,
    createTourReview,
};
import asyncHandler from '../middleware/asyncHandler.js';
import Tour from '../models/tourModel.js';

const getTours = asyncHandler(async (req, res) => {
    const tours = await Tour.find({});
    res.status(200).json(tours);
});

const getTourById = asyncHandler(async (req, res) => {
    const tour = await Tour.findById(req.params.id);
    if (tour) {
        res.status(200).json(tour);
    } else {
        res.status(404);
        throw new Error('Izlet nije pronađen');
    }
});

const createTour = asyncHandler(async (req, res) => {
    const { name, image, description, country, location, category, duration, price, maxGroupSize } = req.body;
    const tour = await Tour.create({
        name, image, description, country, location, category,
        duration, price, maxGroupSize,
        available: true, rating: 0, numReviews: 0,
    });
    res.status(201).json(tour);
});

const updateTour = asyncHandler(async (req, res) => {
    const tour = await Tour.findById(req.params.id);
    if (tour) {
        tour.name = req.body.name || tour.name;
        tour.image = req.body.image || tour.image;
        tour.description = req.body.description || tour.description;
        tour.country = req.body.country || tour.country;
        tour.location = req.body.location || tour.location;
        tour.category = req.body.category || tour.category;
        tour.duration = req.body.duration || tour.duration;
        tour.price = req.body.price || tour.price;
        tour.maxGroupSize = req.body.maxGroupSize ?? tour.maxGroupSize;
        tour.available = req.body.available ?? tour.available;
        const updatedTour = await tour.save();
        res.status(200).json(updatedTour);
    } else {
        res.status(404);
        throw new Error('Izlet nije pronađen');
    }
});

const deleteTour = asyncHandler(async (req, res) => {
    const tour = await Tour.findById(req.params.id);
    if (tour) {
        await Tour.deleteOne({ _id: tour._id });
        res.status(200).json({ message: 'Izlet obrisan' });
    } else {
        res.status(404);
        throw new Error('Izlet nije pronađen');
    }
});

export { getTours, getTourById, createTour, updateTour, deleteTour };
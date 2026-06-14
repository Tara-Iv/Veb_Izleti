import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import tours from './data/tours.js';
import User from './models/userModel.js';
import Tour from './models/tourModel.js';
import Booking from './models/bookingModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await Booking.deleteMany();
        await Tour.deleteMany();
        await User.deleteMany();

        await User.insertMany(users);

        const toursWithDefaults = tours.map((tour) => ({
            ...tour,
            rating: 0,
            numReviews: 0,
            reviews: [],
        }));

        await Tour.insertMany(toursWithDefaults);

        console.log('Podaci uspešno uvezeni!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Booking.deleteMany();
        await Tour.deleteMany();
        await User.deleteMany();

        console.log('Podaci obrisani!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
import dns from 'node:dns/promises';
dns.setServers(["1.1.1.1", "1.0.0.1"]);

import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import tourRoutes from './routes/tourRoutes.js';
import userRoutes from './routes/userRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import Booking from './models/bookingModel.js';

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Veb Izleti API radi...');
});

app.use('/api/tours', tourRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);

app.use(notFound);
app.use(errorHandler);

const completeExpiredBookings = async () => {
    try {
        const today = new Date();
        const result = await Booking.updateMany(
            {
                status: 'confirmed',
                travelDate: { $lt: today },
            },
            { $set: { status: 'completed' } }
        );
        if (result.modifiedCount > 0) {
            console.log(`${result.modifiedCount} rezervacija automatski označeno kao završeno`);
        }
    } catch (error) {
        console.log('Greška pri automatskom završavanju rezervacija:', error.message);
    }
};

// Pokreni odmah pri startu servera
completeExpiredBookings();

// Pa zatim svaki dan
setInterval(completeExpiredBookings, 24 * 60 * 60 * 1000);

app.listen(port, () =>
    console.log(`Server radi na portu ${port}`)
);
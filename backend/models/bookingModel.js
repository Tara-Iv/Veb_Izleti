import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        tour: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Tour',
        },
        tourName: { type: String, required: true },
        tourImage: { type: String, required: true },
        price: { type: Number, required: true },
        numPersons: { type: Number, required: true, default: 1 },
        totalPrice: { type: Number, required: true, default: 0.0 },
        travelDate: { type: Date, required: true },
        contactPhone: { type: String, required: true },
        status: {
            type: String,
            required: true,
            default: 'pending',
            enum: ['pending', 'confirmed', 'cancelled', 'completed'],
},
    },
    { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
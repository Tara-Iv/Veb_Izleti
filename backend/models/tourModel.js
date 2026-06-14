import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    { timestamps: true }
);

const tourSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
        description: { type: String, required: true },
        country: { type: String, required: true },
        location: { type: String, required: true },
        category: { type: String, required: true },
        duration: { type: Number, required: true },
        price: { type: Number, required: true, default: 0.0 },
        maxGroupSize: { type: Number, required: true, default: 0 },
        available: { type: Boolean, required: true, default: true },
        rating: { type: Number, required: true, default: 0 },
        numReviews: { type: Number, required: true, default: 0 },
        reviews: [reviewSchema],
    },
    { timestamps: true }
);

const Tour = mongoose.model('Tour', tourSchema);
export default Tour;
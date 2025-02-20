import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    service: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    renewalDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'cancelled'],
        default: 'active'
    }
}, {
    timestamps: true
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription; 
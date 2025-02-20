import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minlength: [3, "Subscription name must be at least 3 characters long"],
        maxlength: [100, "Subscription name must be less than 100 characters long"]
    },
    price: {
        type: Number,
        required: [true, "Subscription price is required"],
        min: [0, "Subscription price must be greater than 0"]
    },
    currency: {
        type: String,
        enum: ["USD", "EUR", "GBP","KHR", "THB", "VND", "PHP", "MYR", "IDR", "HKD", "CNY", "JPY", "KRW", "NZD", "AUD", "CAD", "CHF", "CLP", "COP", "MXN", "PEN", "VEF", "PYG", "UYU", "ZAR"],
        required: [true, "Subscription currency is required"],
        default: "USD"
    },
    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"],

    },
    category: {
        type: String,
        enum: ["sport", "music", "streaming", "gaming", "other"],
        required: [true, "Subscription category is required"]
    },
    paymentMethod: {
        type: String,
        trim: true,
        required: [true, "Subscription payment method is required"]
    },
    status: {
        type: String,
        enum: ["active", "inactive", "cancelled" ,"expired"],
        required: [true, "Subscription status is required"],
        default: "active"
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value < this.endDate;
            },
            message: "Start date must be before end date"
        }
    },
    renewalDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value > this.startDate;
            },
            message: "Renewal date must be after start date"
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    timestamps: true
});
// auto calculate renewal date if missing
subscriptionSchema.pre("save", function(next) {
    if (!this.renewalDate) {
        const renewalPeriod ={
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        }
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriod[this.frequency]);
    }
});
// auto update status if renewal date is in the past
subscriptionSchema.pre("save", function(next) {
    if (this.renewalDate < new Date()) {
        this.status = "expired";
    }
    next();
});
const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription; 
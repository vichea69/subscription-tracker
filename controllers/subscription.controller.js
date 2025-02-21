import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscriptionData = {
            ...req.body,
            user: req.user._id,
        };

        const subscription = await Subscription.create(subscriptionData);

        res.status(201).json({
            success: true,
            message: "Subscription created successfully",
            data: subscription,
        });
    } catch (error) {
        console.error("Error creating subscription:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create subscription",
            error: error.message,
        });
    }
};

export const getUserSubscriptions = async (req, res, next) => {
    try {
        //check if user is the same as the one in the token
        if (req.user.id !== req.params.id) {
            const error = new Error("You are not Owner of this Account");
            error.statusCode = 403;
            throw error;
        }
        const subscriptions = await Subscription.find({ user: req.params.id })
            .populate('user', 'name');

        res.status(200).json({
            success: true,
            message: "Subscriptions fetched successfully",
            data: subscriptions,
        });
    } catch (error) {
        next(error);
    }
};
export const getAllSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find()
            .populate('user', 'name');
        res.status(200).json({
            success: true,
            message: "Subscriptions fetched successfully",
            data: subscriptions,
        });
    } catch (error) {
        next(error);
    }
};

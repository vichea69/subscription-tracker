import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import {
    createSubscription,
    getUserSubscriptions,
    getAllSubscriptions
} from "../controllers/subscription.controller.js";
const subscriptionRouter = Router();

// Route to get all subscriptions
subscriptionRouter.get("/", getAllSubscriptions);
//get user subscriptions
subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);
//get subscription by id
subscriptionRouter.get("/:id", authorize,);
//create subscription
subscriptionRouter.post("/", authorize, createSubscription);
//update subscription
subscriptionRouter.put("/:id", authorize,);
//cancel subscription
subscriptionRouter.delete("/:id/cancel", (req, res) => {
    res.send({ title: "Cancel subscription" });
});
// coming renewal 
subscriptionRouter.get("/:id/upcoming-renewal", (req, res) => {
    res.send({ title: "GET upcoming renewal date" });
});


export default subscriptionRouter; 
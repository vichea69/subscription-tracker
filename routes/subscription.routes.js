import { Router } from "express";

const subscriptionRouter = Router();

// Route to get all subscriptions
subscriptionRouter.get("/", (req, res) => {
    res.send({ title: "GET all subscriptions" });
});
// GET all user subscriptions
subscriptionRouter.get("/user/:id", (req, res) => {
    res.send({ title: "GET all user subscriptions" });
});

// Route to get a specific subscription by ID
subscriptionRouter.get("/:id", (req, res) => {
    res.send({ title: "GET subscription details"});
});

// Route to create a new subscription
subscriptionRouter.post("/", (req, res) => {
    res.send({ title: "Create a new subscription" });
});

// Route to update a subscription by ID
subscriptionRouter.put("/:id", (req, res) => {
    res.send({ title: "Update subscription details"});
});

// Route to delete a subscription by ID
subscriptionRouter.delete("/:id/cancel", (req, res) => {
    res.send({ title: "Cancel subscription"});
});
// coming renewal 
subscriptionRouter.get("/:id/upcoming-renewal", (req, res) => {
    res.send({ title: "GET upcoming renewal date"});
});


export default subscriptionRouter; 
import express from "express";
import { PORT } from "./config/env.js";
import connectToDatabase from "./database/mongodb.js"; // Import the database connection function
//Routes
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import errorHandler from "./middleware/error.middleware.js";


const app = express();

// Connect to the database
connectToDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Welcome to the Subscription Tracker-API!');
});

app.listen(PORT, () => {
    console.log(`Subscription Tracker-API is running on http://localhost:${PORT}`);
});

export default app;
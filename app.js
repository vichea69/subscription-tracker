import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to the Subcription Tracker-API!');
});

app.listen(3000, () => {
    console.log('Subcription Tracker-API is running on http://localhost:3000');
})

export default app;
import express from 'express';

const app = express();
const PORT = 3000;

// Custom middleware (Teacher in college example)
const logRequest = (req, res, next) => {
    console.log("Sab Thike hai");
    next(); // Pass request to next step (HOD)
};

app.use(logRequest); // Apply middleware globally

app.get('/', (req, res) => {
    res.send('Final response (HOD approved)!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
import express from "express";
import morgan from "morgan";

const app = express();
const PORT = 3000;

//middlewares
app.use(morgan("dev"));
app.use(express.json()); // process json req and put in body object
app.use(express.urlencoded({ extended: true })); // Parses form data (URL-encoded)

// Changed the name from 'user' to 'users' to match your route logic
const users = [
    {id : 1, name: "Rohan", age:23},
    {id : 2, name: "Nilesh", age:40},
    {id : 3, name: "Ketan", age:35},
];

app.get("/api/users", (req, res) => {
    res.json({
        message: "All Users Data",
        data: users, // This now correctly references the array above
    });
});
// 2) POST - api/users - Data Create
app.post("/api/users", (req, res) => {
    const data = {
        id : users.length + 1,
        name: req.body.name,
        age: req.body.age
    }

    users.push(data);

    res.json({
        message : "Data added successfully!",
        body: data
    })
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
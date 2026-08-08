import express from "express";
import bcrypt from "bcrypt";
import connection from "./db.js";

const app = express();

app.use(express.json());

app.post("/register", async (req, res) => {

    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    connection.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hashedPassword],
        (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    message: "Registration Failed"
                });
            }

            res.status(201).json({
                message: "User Registered Successfully"
            });
        }
    );
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
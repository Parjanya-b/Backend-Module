import express from "express";
import connection from "./db.js";
//validation ke liye import//
import { body, validationResult } from "express-validator";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {

    connection.query(
        "SELECT * FROM bikes_info",
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Database Error"
                });
            }

            res.status(200).json(result);
        }
    );
});

app.post(
    "/new",

    body("name").notEmpty().isLength({min:3}).withMessage("Name is required"),
    body("price").notEmpty().withMessage("Price is required"),

    (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const name = req.body.name;
        const engine = req.body.engine;
        const price = req.body.price;
        const company = req.body.company;

        connection.query(
            "INSERT INTO bikes_info (name, engine, price, company) VALUES (?, ?, ?, ?)",
            [name, engine, price, company],
            (err, result) => {

                if (err) {
                    console.log(err);

                    return res.status(500).json({
                        message: "Insert Failed"
                    });
                }

                res.status(201).json({
                    message: "Bike Added Successfully"
                });
            }
        );
    }
);
app.put("/update", (req, res) => {

    const price = req.body.price;
    const name = req.body.name;

    connection.query(
        "UPDATE bikes_info SET price = ? WHERE name = ?",
        [price,name],
        (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    message: "Update Failed"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Bike Not Found"
                });
            }

            res.status(200).json({
                message: "Bike Updated Successfully"
            });
        }
    );
});
app.delete("/delete", (req, res) => {

    const id = req.body.id;

    connection.query(
        "DELETE FROM bikes_info WHERE id = ?",
        [id],
        (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    message: "Delete Failed"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Bike Not Found"
                });
            }

            res.status(200).json({
                message: "Bike Deleted Successfully"
            });
        }
    );
});

function server() {
    console.log("Server running at port 3000");
}

app.listen(3000, server);
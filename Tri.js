import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello");
});

app.get("/name", (req, res) => {
    res.send("my name is parjanya");
});

app.get("/end", (req, res) => {
    res.send("Bye");
});

app.listen(3000);
import express from "express";
const app = express();
app.get("/",(req,res)=>
{
    res.send("Hello Welcome to server");
});
app.listen(3000);
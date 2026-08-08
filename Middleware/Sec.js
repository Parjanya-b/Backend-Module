import express from "express";
const app = express();
const middleman = (req,res,next)=>
{
 console.log("Form is correct");
 next();
}
app.use(middleman);
app.get("/",(req,res)=>
{
    res.send("Application Approved");
});
app.listen(3000);
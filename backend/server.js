const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");

const PORT = process.env.PORT || 8000;
const app = express();

const connectDB = require("./config/db");

const { errorHandler } = require("./middleware/errorMiddleware");

//Setup middleware to handle JSON and urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Connect to database
connectDB();

//Setup base routes
app.get("/", (req, res) => {
    res.json({ message: "Everything ok" });
});

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));

//Setup custom error handler
app.use(errorHandler);

//Set listen
app.listen(PORT, () => console.log(`Serving succesfully on port ${PORT}`));
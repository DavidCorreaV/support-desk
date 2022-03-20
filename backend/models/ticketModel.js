const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    product: {
        type: String,
        required: [true, "Please enter a product"],
        enum: [
            "React Course",
            "Next.js Course",
            "ES6 for Beginners",
            "WebDev Basics",
        ],
    },
    description: {
        type: String,
        required: [true, "Please enter a description of the issue"],
    },
    status: {
        type: String,
        required: [true],
        enum: ["New", "Open", "Closed"],
        default: "New",
    },
}, { timestamps: true });

module.exports = mongoose.model("Ticket", ticketSchema);
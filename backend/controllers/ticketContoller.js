const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");

//@desc Get user tickets
//@route /api/tickets
//@access Private

const getTickets = asyncHandler(async(req, res) => {
    //Get user from JWT _id

    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const tickets = await Ticket.find({ user: req.user.id });

    res.status(200).json(tickets);
});

//@desc create a user ticket
//@route /api/tickets/
//@access Private
const createTicket = asyncHandler(async(req, res) => {
    const { product, description } = req.body;

    if (!product || !description) {
        res.status(400);
        throw new Error("Missing product or description");
    }

    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }
    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: "New",
    });
    res.status(201).json({ ticket });
});
module.exports = { createTicket, getTickets };
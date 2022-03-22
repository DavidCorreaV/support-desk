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

//@desc Get user ticket
//@route GET /api/tickets/:id
//@access Private

const getTicket = asyncHandler(async(req, res) => {
    //Get user from JWT _id

    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404);
        throw new Error("Ticket not found");
    }
    console.log(Ticket);
    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    res.status(200).json(ticket);
});

//@desc create a user ticket
//@route POST /api/tickets/
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

//@desc Delete ticket
//@route DELETE /api/tickets/:id
//@access Private

const deleteTicket = asyncHandler(async(req, res) => {
    //Get user from JWT _id

    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404);
        throw new Error("Ticket not found");
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }
    await Ticket.deleteOne({ ticket });
    res.status(200).json({ success: true });
});

//@desc Update user ticket
//@route PUT /api/tickets/:id
//@access Private

const updateTicket = asyncHandler(async(req, res) => {
    //Get user from JWT _id

    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404);
        throw new Error("Ticket not found");
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
        req.params.id,
        req.body, { new: true }
    );
    res.status(200).json(updatedTicket);
});
module.exports = {
    createTicket,
    getTickets,
    getTicket,
    deleteTicket,
    updateTicket,
};
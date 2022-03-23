const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");
const Note = require("../models/noteModel");

//@desc Get notes for a ticket
//@route /api/tickets/:ticketId/notes
//@access Private

const getNotes = asyncHandler(async(req, res) => {
    //Get user from JWT _id

    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const ticket = await Ticket.findById(req.params.ticketId);
    if (!ticket) {
        res.status(404);
        throw new Error("Ticket not found");
    }
    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Unauthorized");
    }

    const notes = await Note.find({ ticket: req.params.ticketId });

    res.status(200).json(notes);
});

//@desc Create notes for a ticket
//@route  POST /api/tickets/:ticketId/notes
//@access Private
const createNote = asyncHandler(async(req, res) => {
    //Get user from JWT _id

    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const ticket = await Ticket.findById(req.params.ticketId);
    if (!ticket) {
        res.status(404);
        throw new Error("Ticket not found");
    }
    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Unauthorized");
    }

    const notes = await Note.create({
        ticket: req.params.ticketId,
        text: req.body.text,
        isStaff: req.body.isStaff ? req.body.isStaff : false,
        user: req.user.id,
    });

    res.status(200).json(notes);
});
module.exports = { getNotes, createNote };
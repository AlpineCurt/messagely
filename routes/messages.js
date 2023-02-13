const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const Message = require("../models/message");
const { ensureLoggedIn, ensureCorrectUser } = require("../middleware/auth");

/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/
router.get("/:id", ensureLoggedIn, async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await Message.get(id);
        if (req.user.username === result.to_user.username || req.user.username === result.from_user.username) {
            return res.json({message: result});
        }
        throw new ExpressError("Unauthorized", 401)
    } catch (err) {
        return next(err);
    }
});


/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/
router.post("/", async (req, res, next) => {
    try {
        const {from_username, to_username, body} = req.body;
        const result = await Message.create({from_username, to_username, body});
        return res.json({message: result});
    } catch (err) {
        return next(err);
    }
});


/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/
router.post("/:id/read", ensureLoggedIn, async (req, res, next) => {
    try {
        const {id} = req.params;
        const msg = await Message.get(id);
        // debugger;
        if (req.user.username === msg.to_user.username) {
            const result = await Message.markRead(id);
            return res.json({message: result});
        }
        throw new ExpressError("Unathorized", 401);
    } catch (err) {
        return next (err);
    }
});

module.exports = router;
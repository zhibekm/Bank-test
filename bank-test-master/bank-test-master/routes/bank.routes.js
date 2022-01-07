const { Router } = require("express")
const { check, validationResult } = require("express-validator")
const Bank = require("../models/Bank")
const bank = require("./../middleware/bank.middleware")
const router = Router()

router.post("/add", bank, async (req, res) => {
    try {

        const { amount, bankName } = req.body

        const trans = new Bank({
            amount, bankName, owner: req.user.userId
        })

        await trans.save()

        res.status(201).json({ trans, message: "Transaction added successfully" })

    } catch (e) {
        res.status(500).json({ message: "Something went wrong, try again" })
    }
})

router.get("/:id", bank, async (req, res) => {
    try {
        await Bank.find({ owner: req.user.userId }, (error, data) => {
            if (error) {
                return next(error)
            } else {
                res.json(data)
            }
        })
    } catch (e) {
        res.status(500).json({ message: "Something went wrong, try again" })
    }
})

router.delete('/delete/:id', async (req, res, next) => {
    try {
        await Bank.findByIdAndRemove(req.params.id, (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.status(200).json({
                    msg: data
                })
            }
        })
    } catch (e) {
        res.status(500).json({ message: "Something went wrong, try again" })
    } 
})

module.exports = router
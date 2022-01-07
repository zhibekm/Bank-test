const { Router } = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { check, validationResult } = require("express-validator")
const User = require("../models/User")
require("dotenv").config()
const router = Router()

// api/auth/register
router.post("/register", [
        check("email", "Not suitable email").isEmail(),
        check("password", "Minimum length of password is 6").isLength({ min: 6 })],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Not suitable data in registration"
            })
        }

        const { email, password } = req.body

        const candidate = await User.findOne({ email })

        if (candidate) {
            return res.status(400).json({ message: "This email is already used" })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = new User({ email, password: hashedPassword })

        await user.save()

        res.status(201).json({ message: "User has created" })
    } catch (e) {
        res.status(500).json({ message: "Something went wrong, try again" })
    }
})

// api/auth/login
router.post(
    "/login",
    [
        check("email", "Enter a suitable email").normalizeEmail().isEmail(),
        check("password", "Enter a password").exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Not suitable data in login"
            })
        }

        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "User is not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: "Wrong password, try again" })
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "12h" }
        )

        res.json({ token, userId: user.id })

    } catch (e) {
        res.status(500).json({ message: "Something went wrong, try again" })
    }
})

module.exports = router

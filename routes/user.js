const express = require('express')
const router = express.Router()
const User = require('../model/userModel')

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (user == null) {
            res.status(400).json({ message: 'User not found' })
        } else {
            res.status(200).json(user)
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        pass: req.body.pass,
        email: req.body.email,
        phone: req.body.phone
    })
    try {
        await user.save()
        res.status(200).json({ message: 'Success! New user.', id: user.id })
    } catch (err) {
        res.status(400).json()
    }
})

router.patch('/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    if (req.body.username != null) user.username = req.body.username
    if (req.body.pass != null) user.pass = req.body.pass
    try {
        await user.save()
        res.status(200).json({ message: 'User updated' })
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router
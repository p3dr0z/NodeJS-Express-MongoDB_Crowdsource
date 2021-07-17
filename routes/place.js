const express = require('express')
const router = express.Router()
const Place = require('../model/placeModel')

router.get('/', async (req, res) => {
    try {
        const places = await Place.find()
        res.status(200).json(places)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/:id', async (req, res) => {
    const place = await Place.findById(req.params.id)
    try {
        if (place == null) {
            res.status(400).json({ message: 'User not found' })
        } else {
            res.status(200).json(place)
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/', async (req, res) => {
    const place = new Place({
        name: req.body.name,
        category: req.body.category,
        address: req.body.address,
        user: req.body.user
    })
    try {
        await place.save()
        res.status(200).json(`Local ${place.name} adicionado`)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.patch('/:id', async (req, res) => {
    const place = await Place.findById(req.params.id)
    if (req.body.name != null) place.name = req.body.name
    if (req.body.category != null) place.category = req.body.category
    if (req.body.address != null) place.address = req.body.address
    if (req.body.usersLiked != null) {
        place.usersLiked = req.body.usersLiked
        remove(place.user, place.usersDisliked)
    }
    if (req.body.usersDisliked != null) {
        place.usersDisliked = req.body.usersDisliked
        remove(place.user, place.usersLiked)
    }
    try {
        await place.save()
        res.status(200).json({ message: 'Place updated' })
    } catch (err) {
        res.status(200).json(err)
    }
})

const remove = (num, array) => {
        if (array.indexOf(num) != -1) {
            array.splice(array.indexOf(num), 1)
            remove(num, array)
        }
        return
}

module.exports = router
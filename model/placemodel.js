const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true,
        default: 'Sem Categoria'
    },

    address: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    usersLiked: {
        type: Array,
        default: []
    },
    
    usersDisliked: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model('Place', placeSchema)
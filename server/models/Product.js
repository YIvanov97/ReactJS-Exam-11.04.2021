const mongoose = require('mongoose');

const productSchema = new mongoose.Schema ({
    id: mongoose.Types.ObjectId,
    name: {
        type: 'String',
        required: true
    },
    description: {
        type: 'String',
        required: true
    }, 
    imageUrl: {
        type: 'String',
        required: true,
        validate: /^https?/
    },
    price: {
        type: Number,
        required: true    
    }
})

module.exports = mongoose.model('Product', productSchema)
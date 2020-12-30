const mongoose = require('../index')

const userSchema = new mongoose.Schema({
    firstName: { 
        type: String,
        required: [true, "Please enter firstName"] 
    },
    lastName: { 
        type: String,
        required: [true, "Please enter lastName"]
    },
    email: { 
        type: String,
        unique: true,
        required: [true, "Please enter email"],
        lowercase: true

    },
    password: { 
        type: String,
        required: [true, "Please enter password"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema)
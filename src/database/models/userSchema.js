const mongoose = require('../index')
const bcript = require('bcrypt')

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

userSchema.pre('save', async function(next){
    const hash = await bcript.hash(this.password, 10)
    this.password = hash
    next()
})

module.exports = mongoose.model('User', userSchema)
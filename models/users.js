const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({ username })
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if(auth) {
            return user
        } else {
            throw Error('Your password is incorrect. Try again!')
        }
    } else {
        throw Error('This user is not registered!')
    }
}

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})


const User = new mongoose.model('user', userSchema)

module.exports = User
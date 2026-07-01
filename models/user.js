const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {

        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"

    },
},
    {
        timestamps: true
    }
)



userSchema.pre('save', async function (next) {
    try {

        const User = this;

        if (!User.isModified('password')) return next();

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(User.password, salt);

        User.password = hashedPassword;

    }

    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


userSchema.methods.comparePassword = async function (candidatePassword) {
    try {

        const isMatch = await bcrypt.compare(candidatePassword,this.password);

        return isMatch;
    }
    catch (err) {

        throw err;
    }
}



const User = mongoose.model('User', userSchema);

module.exports = User;
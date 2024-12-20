const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Enter your name"],
    },
    email: {
        type: String,
        required: [true, "Enter your email"],
        unique: true,
        lowercase: true,
    },
    membershipType: {
        type: String,
        lowercase: true,
        default: "notmember",
    },
    role: {
        type: String,
        enum: ["user", 'admin'],
        default: "user",
    },
    password: {
        type: String,
        required: [true, "Enter your password"],
        select: false, 
    },
    passwordConfirm: {
        type: String,
        required: [true, "Confirm your password"],
        validate: {
            validator: function(el){
                return el === this.password
            },
            message: "Password mismatched"
        }
    }
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,12);
    this.passwordConfirm = undefined;
    next();
});

userSchema.pre("save", function(next){
    if(!this.isModified("password") || this.isNew) return next();
    this.passwordChangeAt = Date.now() - 1000;
    next();
});

userSchema.pre(/^find/, function(next){
    // this points to current query
    this.find({active: {$ne: false}});
});

userSchema.method.correctPassword = async function(
    candidatePassword,
    userPassword
){
    return await bcrypt.compare(candidatePassword, userPassword);
};


userSchema.method.passwordChangeAfter = function(JWTTimestamp){
    if(this.passwordChangeAt){
        const changeTimeStamp = parseInt(this.passwordChangeAt.getTime()/1000, 10);
        return JWTTimestamp < changeTimeStamp
    }
    return false;
}

const User = mongoose.model("User", userSchema);
module.exports = User;
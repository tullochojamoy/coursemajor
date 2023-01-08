const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, "Please provide a username"],
        },
        email: {
            type: String,
            required: [true, "Please provide a email"],
            unique: true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please provide a valid email",
            ],
        },
        password: {
            type: String,
            //required: [true, "Please add a password"],
            minlength: 6,
            select: false,
        },
        googleId: {
            type: String,
            unique: true,
            required: false
        },
        facebookId: {
            type: String,
            unique: true,
            required: false
        },
        imageUrl: {
            type: String,
            required: false,
        },
        verified: {
            type: Boolean,
            default: false,
            required: true
        },
        isSeller: {
            type: Boolean,
            default: false,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false,
            required: true
        },
        isGoldenMajor: {
            type: Boolean,
            default: false,
            required: true
        },
        isSoftDeleted: {
            type: Boolean,
            default: false,
            required: true
        },
        balance: {
            allTimeBalance: { 
                type: Number, 
                default: 0
            },
            currentBalance: { 
                type: Number, 
                default: 0
            },
        },
        clientId: {
            type: Number,
            required: false
        },
        hackerDetected: {
            type: Boolean,
            default: false,
        },
        paypal: {
            clientId: { 
                type: String, 
            },
            email: { 
                type: String, 
            },
            phone: {
                type: Number, 
            }
        },
         
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    }
);

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function (password) {
    if(!this.password) return false;
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ _id: this._id, isSeller: this.isSeller, isAdmin: this.isAdmin }, 
        process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

UserSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

    return resetToken;
};

UserSchema.methods.updateBalance = async function (value) {
    let savedValue = (100-process.env.ADMIN_PERCENTAGE);
    this.balance.currentBalance = this.balance.currentBalance + value;
    this.balance.allTimeBalance = this.balance.allTimeBalance + this.balance.currentBalance;
    //return await bcrypt.compare(password, this.password); Compare with order price
};

UserSchema.methods.withdrawBalance = async function (value) {
    this.balance.currentBalance = this.balance.currentBalance - value;
};

UserSchema.methods.hackerAlert= function() {
    this.hackerDetected=true;
};

export default mongoose.models.User || mongoose.model("User", UserSchema);
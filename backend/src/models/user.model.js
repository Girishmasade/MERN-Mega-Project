import mongoose, {Schema} from 'mongoose'

const userSchema = new Schema (
    {
        name: {
            type: String,
            required :true,
            trim: true
        },
        email: {
            type: String,
            required :true,
            unique: true,
            trim: true
        },
        avatar : {
            type: String,
            trim: true
        },
        password: {
            type: String,
            required :true,
            trim: true
        },
        verifyOTP: {
            type: String,
            default: ''
        },
        verifyOtpExpireAt: {
            type: Number,
            default: 0
        },
        isAccountVerified: {
            type: Boolean,
            default: false
        },
        resetOtp: {
            type: String,
            default: ''
        },
        resetOtpExpireAt: {
            type: Number,
            default: 0
        },
    }, {timestamps: true})

const User = mongoose.model('user', userSchema)
export default User

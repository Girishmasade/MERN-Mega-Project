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
    }, {timestamps: true})

const User = mongoose.model('user', userSchema)
export default User

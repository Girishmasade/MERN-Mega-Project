import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import transporter from "../config/nodemailer.config.js"

export const register = async (req, res) => {
    try {
        const {name, email, password} = req.body

        // check user existed or not
        const existingUser = await User.findOne({email})

        if (existingUser) {
           return res.json({
                success: false,
                message: 'email already register'
            })
        }
        // hashed the password for security
        const hashedPassword = bcryptjs.hashSync(password, 10)

        // create a new user
        const user = new User({
            name, 
            email,
            password: hashedPassword
        })
        // save the user in database
        await user.save()

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to WebCode',
            text: `Welcome to Webcode website. Your account has been created with email id: ${email}`
        }

        await transporter.sendMail(mailOptions)

        res.json({
            success: true,
            message: 'user reistered successfully'
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const login = async (req, res) => {
    try {
       
        const {email, password} = req.body
        // user is stored or not in database by checking email 
        const user = await User.findOne({email})
        if (!user) {
           return res.json({
                success: false,
                message: `email doesn't exisits`
            })
        }

        // compare the hashed password and user entered password are same or not
        const hashedPassword = user.password
        const comparePassword = bcryptjs.compare(password, hashedPassword)

        if (!comparePassword) {
           return res.json({
                success: false,
                message: `please provide valid password`
            })
        }

        // we assign a token
        const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
        }, 
            process.env.JWT_SECRET,
           {  expiresIn: '10d'}
    )

    res.cookie('acess_token', token, {
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        httpOnly: true,
        path: '/',
        expiresIn: new Date( Date.now() + 24 * 60 * 60 * 1000)
    })

    //We remove the password to prevent exposing sensitive data.
    const newUser = await user.toObject({ getters: true })
    delete newUser.password

    return res.json({
        success:true,
        user:newUser,
        message: 'User Login Successfully '
    })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const googleLogin = async (req, res) => {
    try {
        const {email, name, avatar} = req.body
        let user = await User.findOne({email})
        if (!user) {
            const newUser = new user({
                name,
                email,
                avatar,
                password: hashedPassword
            })

           user = await newUser.save()         
        }

        const token = jwt.sign({
           _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        }, process.env.JWT_SECRET,
            {expiresIn: '7d'}
        )
       
        res.cookie('access_token', token, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            httpOnly: true,
            path: '/',
            expiresIn: new Date(Date.now() + 24 * 60 * 60 * 1000)
        })
        

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('acess_token', {
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            httpOnly: true,
            path: '/',
        })

        return res.json({
            success: true,
            message: 'Logout successfully'
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}
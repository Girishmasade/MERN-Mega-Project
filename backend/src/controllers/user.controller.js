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

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to WebCode',
            text: `Welcome to Webcode website. Your account has been created with email id: ${email}`
        }
        console.log(mailOptions)        

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
    const newUser = user.toObject({ getters: true })
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

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to WebCode',
            text: `Welcome to Webcode website. Your account has been created with email id: ${email}`
        }
        console.log(mailOptions)        

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

// verify user OTP

export const verifyOTP = async (req, res) => {
    try {

        const {userId} = req.body
        const user = await User.findOne({userId})

        if(user.isAccountVerified){
            return res.json({
                success: false,
                message: 'Account already verified'
            })
        }

        const otp = String(Math.floor(1000 + Math.random() * 9000))

        user.verifyOTP = otp
        user.verifyOtpExpireAt= Date.now() + 2 * 60 * 1000

        await user.save()

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Account Verification OTP',
            text: `Your account verification OTP is ${otp}`
        }

        await transporter.sendMail(mailOptions)

        res.json({
            success: true,
            message: 'OTP sent successfully'
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

// verify user email
export const verifyEmail = async (req, res) => {
    try {
        
        const {userId, otp} = req.body
       if(!userId || !otp){
           return res.json({
               success: false,
               message: 'Invalid user data'
           })
       }

       const user = await User.findById({userId})

       if (!user) {
            return res.json({
                succcess: false,
                message: 'user not found'
            })
       }

       if (user.verifyOTP === '' || user.verifyOTP !== otp) {
        return res.json({
            success: false,
            message: 'Invalid OTP'
        })
       }

       if(user.verifyOtpExpireAt < Date.now()){
        return res.json({
            success: false,
            message: 'OTP expired'
        })
       }

       user.isAccountVerified = true
       user.verifyOTP = ''
       user.verifyOtpExpireAt = 0

       await user.save()
       return res.json({
        success: true,
        message: 'Account verified successfully'
       })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}


export const isAccountAuthanticated = async (req, res) => {
    try {
        res.json({
            success: true
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const resendOTP = async (req, res) => {
    try {
            const {email} = req.body
            const user = await User.findOne({email})
            if (!user) {
                return res.json({
                    success:false,
                    messaage: 'Invalid Email Id'
                })
            }

            const otp = String(Math.floor(1000 + Math.random() * 9000))
            user.resetOtp = otp
            user.resetOtpExpireAt = Date.now() + 2 * 60 * 1000

            await user.save()

            const mailOptions = {
                from: proccess.env.EMAIL_USER,
                to: email,
                subject: 'Resend OTP for Account Verification',
                text: `Your account verification OTP is ${otp}`
            }

            await transporter.sendMail(mailOptions)

            return res.json({
                success: true,
                message: 'OTP sent successfully'
            })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const passwordReset = async (req, res) => {
    try {
        const {email, newPassword, otp} = req.body
        const user = await userModel.findOne({email})
        if (!user) {
            res.json({
                success: false,
                message: 'user not found'
            })
        }

        if(user.resetOtp === '' ||  user.resetOtp === !otp){
            res.json({
                success: false,
                message: 'Invalid OTP'
            })
        }

        if(user.resetOtpExpireAt < Date.now()){
            res.json({
                success: false,
                message: 'OTP expired'
            })
        }

        const hashedPassword = bcryptjs.hashSync(newPassword, 10)

        user.password = hashedPassword
        user.resendOTP = ''
        user.resetOtpExpireAt = 0

        await user.save()


        res.json({
            success: true,
            message: 'Password has been reset successfully'
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
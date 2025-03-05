import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); 

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', 
    port: 587, 
    secure: false, 
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
    }
});

// Correct logging
console.log('✅ SMTP User:', transporter.options.auth.user);
console.log('✅ SMTP Pass:', process.env.EMAIL_PASS ? 'Loaded' : 'Missing');

export default transporter;
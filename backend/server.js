import dotenv from 'dotenv'
import {app} from './app.js'
import {connectDB} from './src/database/database.js'
dotenv.config({
    path: './.env'
})

connectDB()

app.listen(process.env.PORT, () => {
    console.log('Server started on port 4000');
})
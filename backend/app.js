import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './src/routers/auth.route.js'

const app = express()
app.use(cors({ credentials: true}))
app.use(express.json())
app.use(cookieParser())


app.use('/api/auth', authRouter)

app.get('/', (req, res) => {
    res.send('This is server')
})

export {app}
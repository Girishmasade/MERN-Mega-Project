import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cors({ credentials: true}))
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('This is server')
})

export {app}
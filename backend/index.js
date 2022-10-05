import express from "express";
import  * as dotenv from 'dotenv'
import cors from 'cors'
import auth from './routes/auth.js'
import posts from './routes/posts.js'
import { connectToDataBase } from "./database.js";
dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

connectToDataBase()

app.use(express.json())
app.use(cors())

app.get('/' , (req, res) => {
    res.send("Hello World")
})

app.use('/auth', auth)
app.use('/feed', posts)

app.listen(PORT, () => console.log(`Server running on Port:${PORT}`))
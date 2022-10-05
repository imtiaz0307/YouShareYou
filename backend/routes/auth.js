import express from 'express'
const router = express.Router()
import User from './../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import fetchuser from '../middleware/fetchuser.js'
import * as dotenv from 'dotenv'
dotenv.config()


let TOKEN_SECRET = process.env.TOKEN_SECRET
let success = 'success';


router.post('/signup', async (req, res) => {
    try {

        const salt = await bcrypt.genSalt(10)
        const userPassword = await bcrypt.hash(req.body.password, salt)

        let user = await User.findOne({username: req.body.username})
        if(user) return res.json({error: 'Username used'})
    
        user = await User.findOne({email: req.body.email})
        if(user) return res.json({error: 'Email used'})
    
        user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: userPassword
        })
        const payload = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(payload, TOKEN_SECRET)
    
        res.json({token, success})
    } catch (error) {
        res.json({error})   
    }
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body
    let user = await User.findOne({email})
    if(!user) return res.json({error: `Email doesn't belongs any account.`})

    const comparePassword = await bcrypt.compare(password, user.password)
    if(!comparePassword) return res.json({error: 'Incorrect Password'})

    const payload ={
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(payload, TOKEN_SECRET)

    res.json({token, success})
})

router.get('/getuser', fetchuser,async (req, res) =>{
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password')
        res.json({user})
    } catch (error) {
        console.log(error)
    }
})

export default router
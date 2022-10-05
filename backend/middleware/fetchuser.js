import jwt  from "jsonwebtoken";
import * as dotenv from 'dotenv'
dotenv.config()

let TOKEN_SECRET = process.env.TOKEN_SECRET

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token')
    if(!token) return res.status(404).send('Please authenticate using valid token.')
    try {
        const data = jwt.verify(token, TOKEN_SECRET)
        req.user = data.user;
        next()
    } catch (error) {
        return res.status(404).send('Please authenticate using valid token.')
    }
}

export default fetchuser;
import Joi from "joi";
import CustomErrorHandler from "../services/CustomErrorHandler";
import User from '../models/user'
import bcrypt from 'bcrypt'
import JwtService from '../services/JwtService'

const loginController = {
    async login(req, res, next) {
        try {
            // validating the request 
            const loginSchema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required() 
            })

            const { error } = loginSchema.validate(req.body)

            if (error) {
                return next(error)
            }

            const user = await User.findOne({ email: req.body.email })
            if(!user) {
                return next(CustomErrorHandler.wrongCredentials())
            }
            // comparing the password
            const isMatch = await bcrypt.compare(req.body.password, user.password)
            if(!isMatch) {
                return next(CustomErrorHandler.wrongCredentials())
            }

            // generating token
            const access_token = JwtService.sign({ _id: user._id, role: user.role })
            res.json({ access_token })
            
        } catch (err) {
            return next(err)
        }
    }
}


export default loginController;
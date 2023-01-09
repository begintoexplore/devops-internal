import Joi from "joi"
import CustomErrorHandler from "../services/CustomErrorHandler"
import User from '../models/user'
import bcrypt from 'bcrypt'
import JwtService from '../services/JwtService'

const registerController = {
    async register(req, res, next) {
        try {
            // Validation
            const registerSchema = Joi.object ({
                name: Joi.string().min(8).max(12).required(),
                email: Joi.string().email().required(),
                password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required() 
            })
        
            const { error } = registerSchema.validate(req.body)
            if (error) {
                return next(error)
            }

            // check if user exist in database..
            const userExist = await User.exists({ email: req.body.email });
            if (userExist) {
                return next(CustomErrorHandler.alreadyExist('This email is already exist.'))
            }

            const { name, email, password } = req.body

            // password hashing 
            const hashedPassword = await bcrypt.hash(password, 10);

            // preparing model for database
            const user = new User({
                name,
                email,
                password: hashedPassword
            })

            let access_token
            const result = await user.save();
            
            // Generating JWT token
            access_token = JwtService.sign({ _id: result._id, name: result.name })
            res.json({ access_token })
            
        } catch (error) {
            return next(error)
        }
    }
}



export default registerController
import express from 'express';
import registerController from '../controllers/registerController';
import loginController from '../controllers/loginController'
const router = express.Router();

router.post('/register', registerController.register)
router.post('/login', loginController.login)


export default router;
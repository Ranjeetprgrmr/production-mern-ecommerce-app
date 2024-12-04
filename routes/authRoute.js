import express from 'express';
import {registerController, loginController, testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController, getAllUsersController} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'

//router object
const router = express.Router();

//routing 
//REGISTER || METHOD POST
router.post('/register', registerController)

//LOGIN || POST
router.post('/login', loginController)

//Forgot Password || POST
router.post('/forgot-password', forgotPasswordController)

//test routes
router.get('/test',requireSignIn, isAdmin, testController);

//protected route auth for user
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

//protected route auth for admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

//update profile
router.put('/profile', requireSignIn, updateProfileController);

//getAllUsers by Admin
router.get('/get-all-users', requireSignIn, isAdmin, getAllUsersController);

//orders-users
router.get('/orders', requireSignIn, getOrdersController);

//orders-admin
router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController);

//orders-admin/statusUpdate
router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController);

export default router;
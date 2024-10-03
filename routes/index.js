const router = require('express').Router();
const userController = require('../controllers/user');
const {verifyUserToken , IsUser , IsAdmin} = require('../middleware/auth');

// Register a new User
router.post('/register',   userController.register);

// Login
router.post('/login', userController.login);

// Auth user only
// userEvent: This route is accessible only to authenticated users with a user_type_id of 0 (regular users). It demonstrates how you can protect a route so that only users with a specific role can access it.
router.get('/events', verifyUserToken, IsUser, userController.userEvent);
// router.get()
// Auth Admin only
// adminEvent: This route is accessible only to authenticated users with a user_type_id of 1 (admins). It demonstrates how you can protect a route so that only admins can access it.
router.get('/special', verifyUserToken, IsAdmin, userController.adminEvent);

module.exports = router;

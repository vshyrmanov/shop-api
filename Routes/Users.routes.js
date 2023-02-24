const {Router} = require('express');
const controller = require('../Controllers/Users.controllers');
const {check, validationResult} = require('express-validator');
const router = Router();
const auth = require('../middleware/middleware.auth');



router.post('/register', [
    check('password', 'Minimum 6 symbols').isLength({min: 6}),
    check('username', 'Min 2 symbols').isLength({min: 2})
], controller.register )
router.post('/login', [
    check('password', 'Enter correct password').exists(),
    check('username', 'Enter correct username').exists()
], controller.login)
router.get('/getUser/:id', controller.getUser);
// router.get('/auth', auth, controller.check)

module.exports = router;
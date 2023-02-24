const {Router} = require('express');
const controller = require('../Controllers/Users_shop.controllers');
const {check, validationResult} = require('express-validator');
const router = Router();
const auth = require('../middleware/middleware.auth');



router.post('/register', [
    check('password', 'Minimum 6 symbols').isLength({min: 6}),
    check('login', 'Min 2 symbols').isLength({min: 2}),
    check('firstName', 'Min 2 symbols').isLength({min: 2})
], controller.register_shop )
router.post('/login', [
    check('password', 'Enter correct password').exists(),
    check('login', 'Enter correct username').exists()
], controller.login_shop)
router.get('/getUser/:id', controller.getUser_shop);
router.get('/getAllUsers', controller.getAllUsers),
router.post('/subscribeOnUser', controller.subscribeOnUser),
    router.delete('/removeSubscribe/:id', controller.removeSubscribe),
router.get('/getUserSubscribes/:id', controller.getUserSubscribes),

    router.post('/createOverallList', controller.createOverallList),
    router.delete('/removeOverallList/:id', controller.removeOverallList),
    router.get('/getOverall/:id', controller.getOverall);

module.exports = router;
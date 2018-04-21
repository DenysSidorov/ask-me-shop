const Router = require('koa-router');
const router = new Router();

const authController = require('../controllers/auth');

router.post('/login', authController.logIn);

// router.post('/logout', authController.logOut);

router.get('/check-token', authController.checkToken);


module.exports  = router;
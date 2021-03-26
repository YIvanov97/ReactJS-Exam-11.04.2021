const { Router } = require('express')

const authController = require('./controllers/authController')
const productController = require('./controllers/productController')

const router = Router()

router.use('/auth', authController);
router.use('/products', productController);
router.get('*', (req, res) => {
    res.render('404');
})

module.exports = router;
const { Router } = require('express');
const productService = require('../services/productService');

const router = Router()

router.get('/', (req, res) => {
    productService.getAll(req.query).then(products =>{
        res.status(200).json(products)
    }).catch(() => res.status(500).end())
})

router.post('/create', async (req, res) => {
    try {
        let product = await productService.create(req.body)
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/details/:id', async (req, res) => {
    let product = await productService.getOne(req.params.id)
    res.status(200).json(product)
})

router.post('/:id/delete', (req, res) => {
    productService.deleteOne(req.params.productId)
    res.status(200)
})

module.exports = router;
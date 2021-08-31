const express = require('express')
const { validationResult } = require('express-validator')
const multer = requre('multer')
const productsRepo = require('../../repositories/product')
const productsNewTemplate = require('../../views/admin/products/new')
const { requireTitle, requirePrice } = require('./validator')

const router = express.Router();
const upload = multer({ storage: multer.memoryStroage()})

router.get('/admin/products', (req, res) => {})

router.get('/admin/products/new', (req, res) => {
    res.send(productsNewTemplate({}));
})

router.post('/admin/products/new', [requireTitle, requirePrice], upload.single('image'), (req, res) => {
    const errors = validationResult(req);
    console.log(errors);

    res.send('submitted')
})

module.exports = router
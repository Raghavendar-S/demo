const { isAdmin, requireSignIn } = require('../Middlewares/authMiddleware')
const {createProductController, updateProductController, getProductController, getSingleProductController, productPhotoController, deleteProductController} = require('../Controllers/productController')
const express = require('express')
const formidable = require('express-formidable')

const router = express.Router()

//routes
//create product
router.post('/create-product', requireSignIn,isAdmin,formidable(),createProductController)

//update product
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController)

//all products
router.get('/get-product',getProductController);

//single product 
router.get('/get-product/:slug',getSingleProductController);

//get photo
router.get('/product-photo/:pid',productPhotoController)

//delete product
router.delete('/delete-product/:pid',deleteProductController)

module.exports = router
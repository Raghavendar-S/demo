const { isAdmin, requireSignIn } = require('../Middlewares/authMiddleware')
const {priceUpdateController, getPriceUpdateController} = require("../Controllers/OtherDetailsController")
const express = require('express')

const router = express.Router()

router.put('/price-update', requireSignIn, isAdmin, priceUpdateController);

router.get('/get-price-date', getPriceUpdateController);

module.exports = router
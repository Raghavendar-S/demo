const mongoose = require('mongoose')

const OtherDetailsSchema = new mongoose.Schema({
    priceUpdated:{
        type:Date
    },
}, {timestamps:true})

const OtherDetails = mongoose.model('OtherDetails',OtherDetailsSchema)
module.exports = OtherDetails
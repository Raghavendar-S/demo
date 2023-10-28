const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        default:1
    },
    photo:{
        data:Buffer,
        contentType:String
    }
}, {timestamps:true})

const Product = mongoose.model('Product',productSchema)
module.exports = Product
const productModel = require('../Models/ProductModel');
const fs = require('fs');
const slugify = require('slugify');

const createProductController = async(req,res) => {
    try{
        const {name,description,price} = req.fields
        const {photo} = req.files

        //validation
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is required'})
            case !description:
                return res.status(500).send({error:'Description is required'})
            case !price:
                return res.status(500).send({error:'Price is required'})
            case photo && photo.size>50000000:
                return res.status(500).send({error:'Photo is required and should be less than 50mb'});               
        }

        const products = new productModel({...req.fields,slug:slugify(name)})
        if(photo)
        {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success:true,
            message: "Product created successfully",
            products
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in creating product",
            error
        })
    }
}

const getProductController = async(req,res) => {
    try{
        const products = await productModel.find({}).select("-photo").limit(12).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            countTotal: products.length,
            message:"All products",
            products,
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in getting products",
            error:error.message
        })
    }
}

const getSingleProductController = async(req,res) => {
    try{
        const product = await productModel.findOne({slug:req.params.slug}).select('-photo')
        res.status(200).send({
            success:true,
            message:'Single Product fetched',
            product
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in getting single products",
            error
        })
    }
}

const productPhotoController = async (req,res) => {
    try{
        const product = await productModel.findById(req.params.pid).select("photo")
        if(product.photo.data){
            res.set('Content-type',product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error while getting photo',
            error
        })
    }
}

const deleteProductController = async(req,res) => {
    try{
        await productModel.findByIdAndDelete(req.params.pid).select('-photo')
        res.status(200).send({
            success:true,
            message:"Product deleted successfully",
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error while deleting product',
            error
        })
    }
}

const updateProductController = async (req, res) => {
    try {
        const { name, description, price } = req.fields;
        const { photo } = req.files;

        // Validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is required' });
            case !description:
                return res.status(500).send({ error: 'Description is required' });
            case !price:
                return res.status(500).send({ error: 'Price is required' });
            case photo && photo.size > 50000000:
                return res.status(500).send({ error: 'Photo is required and should be less than 50mb' });
        }

        const products = await productModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: 'Product updated successfully',
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in updating the product',
            error,
        });
    }
};

module.exports = {createProductController, updateProductController, getProductController,getSingleProductController, productPhotoController, deleteProductController};
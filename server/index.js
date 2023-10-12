const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("./Models/UserSchema")
const dotenv = require("dotenv")

dotenv.config()

const app = express()

mongoose.connect(
    process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{
        app.listen(3001, ()=>{
            console.log("Server is connected to port 3001 and connected to MongoDB")
        })
    })
    .catch(()=>{
        console.log("Unable to connect to the server and/or mongodb ")
    })

app.use(bodyParser.json())
app.use(cors())

app.post('/register', async (req,res)=>{
    try{
        const {name,email,phone,password,role} = req.body
        if(!name){
            return res.send({message:"Name is required"});
        }
        if(!email){
            return res.send({message:"Email is required"});
        }
        if(!phone){
            return res.send({message:"Phone is required"});
        }
        if(!password){
            return res.send({message:"Password is required"});
        }
        const existingUser = await User.findOne({email})

        if(existingUser)
        {
            return res.send({message:"The email is already registered.Please login with another email"})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({name,email,phone,password: hashedPassword,role})
        await newUser.save()
        res.send({success:true,message: 'Registration is done successfully'})
    } catch (error){
        res.send({message:'Error signing up'})
    }
})

app.get('/register', async(req,res)=>{
    try{
        const users = await User.find()
        res.send({users})
    }catch(error){
        res.send({error:'Unable to get users'})
    }
})

app.post('/login',async(req,res)=>{
    try{
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!email || !password){
            return res.send({message:"Invalid Credentials"})
        }
        if(!user){
            return res.send({message:"Email is not registered"})
        }
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return res.send({message:"Password mismatch"})
        }
        const token = jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:'1hr'})
        res.send({success:true,message:'Login successful',token})
    } catch(error){
        res.send({message:'Error logging in'})
    }
})

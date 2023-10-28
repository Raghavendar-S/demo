const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const authRoute = require("./Routes/authRoute")
const productRoute = require("./Routes/productRoutes")
const OtherDetailsRoute = require("./Routes/OtherDetailsRoute")

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

//routes
app.use('/',authRoute);
app.use('/product',productRoute);
app.use('/other',OtherDetailsRoute);


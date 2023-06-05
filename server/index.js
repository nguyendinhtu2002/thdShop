const express = require('express')
const dotenv = require("dotenv");
const cors = require("cors")
const connectDatabase = require("./config/MongoDb.js");
const UserRouter = require('./router/User.js')
const PayRouter = require('./router/Pay.js')
const ProductRouter = require('./router/Product.js');
const ImportData = require('./DataImport.js');
const helmet = require("helmet");
const CategoryRouter = require('./router/Category.js')
// const stripe = require('stripe')('pk_test_51MqDa6CnJIa4Gyt64yUggYm6IjolIpWFmj2kIZAgWxf1poz5FwgIKs4ayEKOnt8OhemksZA7f2ohRyBSXlw94Nae00e7vs3NvG');

const app = express()
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
dotenv.config();
connectDatabase();
app.use(cors(corsOptions))
app.use(helmet());

app.use(express.json())
app.use('/api/v1/users', UserRouter)
app.use('/api/v1/pay',PayRouter)
app.use('/api/v1/product',ProductRouter)
app.use('/api/import', ImportData)
app.use('/api/v1/category',CategoryRouter)
app.listen(process.env.PORT || 5000, () =>
    console.log(`Server started on ${process.env.PORT}`)
);
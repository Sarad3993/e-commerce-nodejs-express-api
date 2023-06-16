const Order = require('../models/Order')
const Product = require('../models/Product')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const {checkPermissions} = require('../utils')


const createOrder = async (req, res) =>{
    const {items:cartItems, tax, shippingFee} = req.body;
    if(!cartItems || cartItems.length < 1){
        throw new CustomError.BadRequestError('No items in cart');
    }
    if(!tax || !shippingFee){
        throw new CustomError.BadRequestError('Please provide tax and shipping fee');
    }

    let orderItems = [];
    let subtotal = [];

    for(const item of cartItems){
        const dbProduct = await Product.findOne({_id:item.product})
        if(!dbProduct){
            throw new CustomError.NotFoundError(
                `No product with id: ${item.product}`
            );
        }
        const {name, price, image, _id} = dbProduct
        const singleOrderItem = {
            amount: item.amount,
            name,
            price,
            image,
            product:_id,
        };
        // add item to order 
        orderItems = [...orderItems,singleOrderItem];
        // calculate subtotal
        subtotal += item.amount * price;
    }
    console.log(orderItems);
    console.log(subtotal);



    res.send('create order')
} 

const getAllOrders = async (req, res) =>{
    res.send('get all orders')
}

const getSingleOrder = async (req,res) =>{
    res.send('get single order')
}

const getCurrentUserOrders = async (req,res) =>{
    res.send('get current user orders')
}

const updateOrder = async (req,res) =>{
    res.send('update order')
}


module.exports = {
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    createOrder,
    updateOrder,
}


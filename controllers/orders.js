const Order = require('../models/Order')

module.exports = {
    getOrders: async (req,res)=>{
        console.log(req.user)
        try{
            const orders = await Order.find().sort({ createdAt: "desc" })
            const ordersLeft = await Order.countDocuments({completed: false})
            res.render('orders.ejs', {orders: orders, left: ordersLeft})
        }catch(err){
            console.log(err)
        }
    },
    createOrder: async (req, res)=>{
        try{
            await Order.create({order: req.body.order, completed: false, completedBy: "incomplete", customerName: req.body.customer})
            console.log('Order has been added!')
            res.redirect('/orders')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Order.findOneAndUpdate({_id:req.body.orderIdFromJSFile},{
                completed: true,
                completedBy: req.user.username
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Order.findOneAndUpdate({_id:req.body.orderIdFromJSFile},{
                completed: false,
                completedBy: "incomplete"
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteOrder: async (req, res)=>{
        try{
            await Order.findOneAndDelete({_id: req.params.id})
            console.log('Deleted Order')
            res.redirect('/orders')
        }catch(err){
            console.log(err)
        }
    },
}    
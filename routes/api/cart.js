const Cart = require('../../models/cart');
const express = require("express");
const router = express.Router();
const passport = require('passport');
const errorHandler = require("../../middleware/error");

//route: /api/cart POST
router.post("/",passport.authenticate('jwt',{session: false}), async(req, res)=>{
    try{
        let cart = await Cart.findById(req.body.cart);
        cart.products.push(req.body.product);
        cart.save();
        res.json({
            "message": "Product added to cart",
            cart
        });
    } catch (err) {
        errorHandler(err);
    }
    

});

//route: /api/cart GET
// router.get()
module.exports = router;


// {
// 	"cart": "5e9ecbc8315fa53bd4fe7486",
// 	"product": "5e9ecafb315fa53bd4fe7483"
// }
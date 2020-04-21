const Cart = require("../../models/cart");
const {Product} = require("../../models/product");
const express = require("express");
const router = express.Router();
const passport = require("passport");
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

//route: /api/cart/display POST
router.post("/display", async (req, res)=>{
    try{
        let products = await Cart.findById(req.body.cart).populate({
            path: 'products'
        });

        return res.status(200).json({
            message: "products",
            products
        });
    } catch (err) {
        errorHandler(err);
    }
})

//route: /api/cart/?product_id=123&cart_id=231  DELETE
//to remove all instances of that product
router.delete("/", async (req, res)=>{
    try{
        let cart = await Cart.findByIdAndUpdate(req.query.cart_id, {
            $pull: {products: req.query.product_id}
        });
        let product = await Product.findById(req.query.product_id);
        return res.status(200).json({
            message: "Product deleted",
            product
        });

    } catch(err) {
        errorHandler(err);
    }
})
module.exports = router;

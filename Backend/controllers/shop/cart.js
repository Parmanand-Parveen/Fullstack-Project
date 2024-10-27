const cartModel = require("../../models/cart.model");
const productModel = require("../../models/product.model");
const userModel = require("../../models/user.model");

const getCart = async (req, res) => {
  const {userId} = req.body;
  const cart = await cartModel.findOne({ user: userId }).populate("items.product");
  res.status(200).json({ success: true, cart });
};

const addToCart = async (req, res) => {
  try {
    let { productId, quantity, userId } = req.body;
    // Find the product by ID

    const product = await productModel.findById(productId);

    //find the cart is available for user or not
    const cart = await cartModel.findOne({ user: userId });
  
    if (!cart) {
      //Create a new cart for that user
      const newCart = new cartModel({
        user: userId,
        items: [{ product:productId, quantity }],
      });
      newCart.save();
      return res.status(200).json({
        success: true,
        message: "Product added to cart",
         newCart,
      });
    } else {
      const existingItemIndex = cart.items.findIndex(item => item.product == productId);
      

      if (existingItemIndex >= 0) {
        // Product already exists in the cart, update the quantity
        if(product.quantity < quantity){
          return res.status(400).json({
            success: false,
            message: "Product quantity not available",
          });
        }
        cart.items[existingItemIndex].quantity += Number(quantity);
        // cart.items[existingItemIndex].price = product.price;  // Update price in case it has changed
        await cart.save();
        res.status(200).json({
          success: true,
          message: "Product quantity updated in cart",
        });
       } else {
        // If product not in cart, add new item
        cart.items.push({ product:productId, quantity: quantity });
        cart.save();
        res.status(200).json({
          success: true,
          message: "Product added to cart",
        });
      }
    }
  } catch (error) {
    console.log("Error occurred while adding to cart: ", error);
    res
      .status(500)
      .json({ success: false, message: "Error occurred while adding to cart" });
  }
};


const removeFromCart = async (req, res) => {
  try {
    const { productId, userId } = req.body;
    const cart = await cartModel.findOneAndUpdate(
      { user: userId },
      { $pull: { items: { product: productId } } },
      { new: true }
    );
    res.status(200).json({ success: true, message: "Product removed from cart", cart });
  } catch (error) {}
};


const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const cart = await cartModel.findOneAndUpdate(
      { user: userId },
      { $set: { items: [] } },
      { new: true }
    );
    res.status(200).json({ success: true, message: "Cart cleared", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error occurred while clearing cart" });
  }
};

module.exports = { getCart, addToCart, removeFromCart, clearCart };

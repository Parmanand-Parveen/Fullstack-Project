const productModel = require("../../models/product.model");
const { imageUploadUtil } = require("../../utils/cloudinary");

const createProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    saleprice,
    category,
    brand,
    quantity,
    image,
  } = req.body;
  try {
    const product = await productModel.create({
      name,
      description,
      price,
      saleprice,
      category,
      brand,
      quantity,
      image,
    });
    res
      .status(200)
      .json({ success: true, message: "Product Created", product });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Product not created" });
  }
};

const readProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

module.exports = {
  createProduct,
  handleImageUpload,
  readProducts,
  deleteProduct,
  updateProduct,
};

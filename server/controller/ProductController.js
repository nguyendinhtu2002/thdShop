const Product = require("../model/Product");
const _ = require("lodash");

const createProduct = async (req, res, next) => {
  try {
    const {
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      thumbnail,
      images,
    } = req.body;

    if (
      title != "" ||
      description != "" ||
      price != "" ||
      discountPercentage != "" ||
      rating != "" ||
      stock != "" ||
      brand != "" ||
      category != "" ||
      thumbnail != "" ||
      images != ""
    ) {
      const product = Product.create({
        title,
        description,
        price,
        discountPercentage,
        rating,
        stock,
        brand,
        category,
        thumbnail,
        images,
      });
      if (product) {
        return res.status(201).json({
          message: "Success",
          code: 1,
        });
      } else {
        return res
          .status(400)
          .json({ message: "Invalid Product Data", code: 0 });
      }
    } else {
      return res.status(400).json({ message: "Phải điền đủ thông tin" });
    }
  } catch (error) {
    next(error);
  }
};

const getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    next(error);
  }
};
const getDetailProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (product !== null) {
      return res.json(product);
    } else {
      return res.status(400).json({ message: "Khong tim thay san pham" });
    }
  } catch (error) {
    next(error);
  }
};
const findByProduct = async (req, res, next) => {
  try {
    // console.log(req.query.q)
    const product = await Product.find({
      $or: [
        { title: { $regex: req.query.q, $options: "i" } },
        { description: { $regex: req.query.q, $options: "i" } },
        { brand: { $regex: req.query.q, $options: "i" } },
        { category: { $regex: req.query.q, $options: "i" } },
      ],
    });
    return res.json({ products: product });
  } catch (error) {
    next(error);
  }
};
const updateProduct = async (req, res, next) => {
  try {
    const data = req.body;
    const products = await Product.findOne({ _id: req.params.id });
    if (products === null) {
      return res
        .status(404)
        .send({ error: "Err", message: "Product not found" });
    } else {
      const updatedProduct = await Product.findByIdAndUpdate(
        products._id,
        data,
        {
          new: true,
        }
      );
      return res.status(200).json({
        status: "OK",
        message: "SUCCESS",
        data: updatedProduct,
      });
    }
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.json({ success: false });
    }
    await Product.deleteOne({ _id: req.params.id });
    return res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

const getProductByCategory = async (req, res, next) => {
  try {
    // console.log(req.query.q)
    const product = await Product.find({
      category: req.params.category,
    });
    return res.json({ products: product });
  } catch (error) {
    next(error);
  }
};
const getAllCategory = async (req, res, next) => {
  try {
    const product = await Product.find({});
    const uniqueCategories = product.reduce((acc, product) => {
      if (!acc.includes(product.category)) {
        acc.push(product.category);
      }
      return acc;
    }, []);
    return res.json(uniqueCategories);
  } catch (error) {
    next(error)
  }
};
module.exports = {
  createProduct,
  getAllProduct,
  getDetailProduct,
  findByProduct,
  updateProduct,
  deleteProduct,
  getProductByCategory,
  getAllCategory,
};

const Pay = require("../model/Pay");

const createPay = async (req, res, next) => {
  try {
    const { carts, token, id } = req.body;
    const productsForPay = carts.map((product) => ({
      title: product.title,
      price: product.price,
      idProduct: product._id,
      price: product.price,
      totalPrice: product.totalPrice,
      discountedPrice: product.discountPercentage,
      quantity: product.quantity,
      thumbnail: product.thumbnail,
    }));
    if (carts.length === 0) {
      return res.json({ error: true, msg: "Khong co san pham nao" });
    } else {
      const pay = await Pay.create({
        products: productsForPay,
        address_city: token.card.address_city,
        address_country: token.card.address_country,
        address_line1: token.card.address_line1,
        namePay: token.card.name,
        type: token.type,
        email: token.email,
        id: id,
      });
      if (pay) {
        return res.status(201).json({
          message: "Success",
          code: 1,
        });
      } else {
        return res.status(400).json({ message: "Invalid Pay Data", code: 0 });
      }
    }
  } catch (error) {
    next(error);
  }
};

const getPayAll = async (req, res, next) => {
  try {
    const pay = await Pay.find({});
    return res.json(pay);
  } catch (error) {
    next(error);
  }
};

const getDetailPay = async (req, res, next) => {
  try {
    const pay = await Pay.findOne({ _id: req.params.id });
    if (pay !== null) {
      return res.json(pay);
    } else {
      return res.status(400).json({ message: "Khong tim thay san pham" });
    }
  } catch (error) {
    next(error);
  }
};
const updatePay = async (req, res, next) => {
  try {
    const data = req.body;
    const pay = await Pay.findOne({ _id: req.params.id });
    if (pay === null) {
      return res.status(404).send({ error: "Err", message: "Pay not found" });
    } else {
      const pricetemp = pay.products[0].price * data.products[0].quantity;
      pay.address_line1 = data.address_line1;
      pay.products[0].quantity = data.products[0].quantity;
      pay.products[0].totalPrice =
        pricetemp - pricetemp * (pay.products[0].discountedPrice / 100);
      const updatedPay = await pay.save();

      return res.status(200).json({
        status: "OK",
        message: "SUCCESS",
        data: updatedPay,
      });
    }
  } catch (error) {
    next(error);
  }
};
const deletePay = async (req, res, next) => {
  try {
    const pay = await Pay.findById(req.params.id);
    if (!pay) {
      return res.json({ success: false });
    }
    await Pay.deleteOne({ _id: req.params.id });
    return res.json({ success: true });
  } catch (error) {
    next(error);
  }
};
module.exports = { createPay, getPayAll, getDetailPay, updatePay,deletePay };

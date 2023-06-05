const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  idProduct: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  price: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    require: true,
  },
  discountedPrice: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
    require: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  // Thêm các thuộc tính khác nếu cần
});

const paySchema = mongoose.Schema(
  {
    address_city: {
      type: String,
      required: true,
    },
    address_country: {
      type: String,
      required: true,
    },
    address_line1: {
      type: String,
      required: true,
    },
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    namePay: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "ship",
    },
    email: {
      type: String,
      required: true,
    },
    isSucces: {
      type: Boolean,
      default: true,
    },
    isShip: {
      type: Boolean,
      default: false,
    },
    isDelivery: {
      type: Boolean,
      default: false,
    },
    isReturn: {
      type: Boolean,
      default: false,
    },
    products: [productSchema],
  },
  {
    timestamps: true,
  }
);

const Pay = mongoose.model("Pay", paySchema);

module.exports = Pay;

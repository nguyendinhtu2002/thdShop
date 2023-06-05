const express = require("express");
const {
  createProduct,
  getAllProduct,
  getDetailProduct,
  findByProduct,
  updateProduct,
  deleteProduct,
  getProductByCategory,
  getAllCategory,
} = require("../controller/ProductController");
const router = express.Router();

router.post("/", createProduct);
router.get("/", getAllProduct);
router.get('/search',findByProduct)
router.get("/:id", getDetailProduct);
router.put('/:id',updateProduct)
router.delete('/:id',deleteProduct)
router.get('/category/all',getAllCategory)
router.get('/category/:category',getProductByCategory)
module.exports = router;

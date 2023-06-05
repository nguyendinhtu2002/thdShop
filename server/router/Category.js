const express = require("express");
const {
  createCategory,
  getAllCategory,
  deleteCategory,
} = require("../controller/CategoryController");
const router = express.Router();

router.post("/", createCategory);
router.get("/", getAllCategory);
router.put("/:id", deleteCategory);
module.exports = router;

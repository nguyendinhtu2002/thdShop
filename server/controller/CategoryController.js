const Category = require("../model/Category");

const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (name !== "") {
      const product = await Category.findOne({
        name,
      });
      if (product) {
        return res.status(400).json({ message: "Category already exists" });
      } else {
        const product = Category.create({
          name,
        });
        if (product) {
          return res.status(201).json({
            message: "Success",
            code: 1,
          });
        } else {
          return res
            .status(400)
            .json({ message: "Invalid Category Data", code: 0 });
        }
      }
    } else {
      return res.status(400).json({ message: "Phải điền đủ thông tin" });
    }
  } catch (error) {
    next(error);
  }
};

const getAllCategory = async (req, res, next) => {
  try {
    const getAll = await Category.find({});
    return res.json(getAll);
  } catch (error) {
    next(error);
  }
};
const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.json({ success: false });
    }
    await Category.deleteOne({ _id: req.params.id });
    return res.json({ success: true });
  } catch (error) {
    next(error);
  }
};
module.exports = { createCategory, getAllCategory, deleteCategory };

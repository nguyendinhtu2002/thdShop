const mongoose = require('mongoose');

// Tạo schema cho Product
const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    }
});

// Tạo model cho Product
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
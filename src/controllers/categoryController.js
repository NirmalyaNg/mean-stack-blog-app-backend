const Category = require('../models/category');
const Post = require('../models/post');

const addCategory = async (req, res) => {
  try {
    const data = req.body;
    if (!data.name || data.name.trim().length === 0) {
      return res.status(400).send({
        error: 'Category Name is required',
      });
    }
    const alreadyPresent = await Category.findOne({ name: data.name });
    if (alreadyPresent) {
      return res.status(400).send({
        error: 'Category already present',
      });
    }
    const category = new Category(data);
    await category.save();
    res.status(201).send(category);
  } catch (e) {
    res.status(400).send({
      error: e.message,
    });
  }
};

const fetchCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (e) {
    res.status(500).send({
      error: e.message,
    });
  }
};

const deleteCategoryUpdated = async (req, res) => {
  try {
    const cat = await Category.findOne({ _id: req.params.id });
    if (!cat) {
      return res.status(404).send({
        error: 'Category not found',
      });
    }
    await Category.deleteOne({
      _id: cat._id,
    });
    await Post.deleteMany({
      category: cat.name,
    });
    res.send(cat);
  } catch (e) {
    res.status(500).send({
      error: e.message,
    });
  }
};

const editCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).send({
        error: 'Category Not Found!',
      });
    }
    if (!req.body.name) {
      return res.status(400).send({
        error: 'Category Name is required',
      });
    }
    const inValidUpdate = Object.keys(req.body).find((update) => update !== 'name');
    if (inValidUpdate) {
      return res.status(400).send({
        error: 'Invalid updates provided!',
      });
    }
    category.name = req.body.name;
    await category.save();
    res.send(category);
  } catch (e) {
    res.status(500).send({
      error: e.message,
    });
  }
};

module.exports = {
  addCategory,
  fetchCategories,
  deleteCategoryUpdated,
  editCategory,
};

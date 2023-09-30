const express = require('express');
const {
  addCategory,
  fetchCategories,
  deleteCategoryUpdated,
  editCategory,
} = require('../controllers/categoryController');
const auth = require('../middlewares/auth');

const router = new express.Router();

// Add a category
router.post('/', auth, addCategory);

// Fetch categories
router.get('/', fetchCategories);

// Delete Category
router.delete('/:id', auth, deleteCategoryUpdated);

// Edit Category
router.patch('/:id', auth, editCategory);

module.exports = router;

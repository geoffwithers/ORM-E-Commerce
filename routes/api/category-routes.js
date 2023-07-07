const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({ include: [{ model: Product }] });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'data was not found'});
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, { include: [{ model: Product }] });
    if (!category) {
      res.status(404).json({ message: 'ID was not found'});
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: 'data was not found' });
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: 'failed to create category' });
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const updated = await Category.update(req.body, { where: { id: req.params.id }});
    !updated[0] ? res.status(404).json({ message: 'ID was not found' }) : res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'failed to update' });
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const deleted = await Category.destroy({ where: { id: req.params.id }});
    !deleted ? res.status(404).json({ message: "ID was not found" }) : res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
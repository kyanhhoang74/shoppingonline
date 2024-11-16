const express = require("express");
const router = express.Router();
const CategoriesModel = require("../models/CategoriesModel");
const { check, validationResult } = require("express-validator/check");

router.get("/all_categories", async (req, res) => {
  const category = await CategoriesModel.find({});
  res.json(category);
});
router.get("/get_category/:id", async (req, res) => {
  const { id } = req.params;

  const category = await CategoriesModel.findById(id);

  if (!category) {
    res.json({ message: "categories not found", status: 0 });
    return;
  }

  res.json(category);
});


router.post(
  "/add",
  check("name", "Enter category Name").not().isEmpty(),

  (req, res) => {
    const { name } = req.body;

    const error = validationResult(req);

    if (!error.isEmpty()) {
      res.json({ error: error.array(), status: 0 });
      return;
    }

    const newcategory = new CategoriesModel({
      name,
    });

    newcategory.save().then((docs) => {
      res.send({ message: "Categories added", status: 1, docs });
    });
  }
);
router.put('/edit/:id', 
check("name", "Enter Name Category").not().isEmpty(),
async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedCategory = await CategoriesModel.findByIdAndUpdate(id, { name }, { new: true });

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category updated successfully', category: updatedCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({   message: 'Server Error' });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await CategoriesModel.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });
  } catch   
  (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;

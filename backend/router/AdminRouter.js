const express = require("express");
const router = express.Router();
const AdminModel = require("../models/AdminModel");
const { check, validationResult } = require("express-validator/check");

router.get("/all_admin", async (req, res) => {
  const admin = await AdminModel.find({});
  res.json(admin);
});
router.get("/get_admin:id", async (req, res) => {
  const { id } = req.params;

  const admin = await AdminModel.findById(id);

  if (!admin) {
    res.json({ message: "admin not found", status: 0 });
    return;
  }

  res.json(admin);
});


router.post(
  "/add",
  check("name", "username admin Name").not().isEmpty(),
  check("name", "password admin Name").not().isEmpty(),

  (req, res) => {
    const { username, password } = req.body;

    const error = validationResult(req);

    if (!error.isEmpty()) {
      res.json({ error: error.array(), status: 0 });
      return;
    }

    const newcadmin = new AdminModel({
      username,
      password
    });

    newcadmin.save().then((docs) => {
      res.send({ message: "Admin added", status: 1, docs });
    });
  }
);
router.put('/edit/:id', 
check("name", "Enter Name Admin").not().isEmpty(),
async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { password } = req.body;

  try {
    const updatedAdmin = await AdminModel.findByIdAndUpdate(id, { name , password }, { new: true });

    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.json({ message: 'Admin updated successfully', admin: updatedAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({   message: 'Server Error' });
  }
});

module.exports = router;

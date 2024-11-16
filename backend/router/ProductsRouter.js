const express = require("express");
const app = express();
const router = express.Router();
const ProductsModel = require("../models/ProductsModel");

const {
  check,
  validationResult
} = require("express-validator/check");


router.get("/all_products", async (req, res) => {
  const product = await ProductsModel.find({});
  res.json(product);
});
router.get("/get_product/:id", async (req, res) => {
  const {
    id
  } = req.params;

  const product = await ProductsModel.findById(id);

  if (!product) {
    res.json({
      message: "product not found",
      status: 0
    });
    return;
  }

  res.json(product);
});


router.post(
  "/addproduct",
  check("category_id", "Enter Category").not().isEmpty(),
  check("product_name", "Enter Product Name").not().isEmpty(),
  check("description", "Enter product description").not().isEmpty(),
  check("price", "Enter Product Price").not().isEmpty(),
  check("image_preview", "Add Image preview Link").not().isEmpty(),
  check("stock", "Enter product stock").not().isEmpty(),
  check("capacities", "Capacities is required").not().isEmpty(),
  check("capacities.*.capacity", "Capacity name is required").not().isEmpty(),
  check("capacities.*.price_capacity", "Capacity Price is required").not().isEmpty(),
  check("capacities.*.color_name", "Color name is required").not().isEmpty(),
  check("capacities.*.image", "Image is required").not().isEmpty(),
  check("status", "Status is required").not().isEmpty(),
  async (req, res) => {
    const {
      category_id,
      description,
      product_name,
      price,
      stock,
      capacities,
      status,
      price_sale,
      image_preview
    } = req.body;
  
    console.log("aaaaa",image_preview)
    const error = validationResult(req);

    if (!error.isEmpty()) {
      res.json({
        error: error.array(),
        status: 0
      });
      return;
    }


    const newProduct = new
    ProductsModel({
      category_id,
      product_name,
      price,
      price_sale,
      image_preview,
      description,
      stock,
      capacities,
      status
    });

    newProduct
      .save()
      .then((docs) => {
        res.send({
          message: "Product added",
          status: 1,
          docs
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({
          message: "Error adding product",
          status: 0
        });
      });
  }
);

router.put('/editproduct/:id',
  check("category_id", "Enter Category").not().isEmpty(),
  check("product_name", "Enter Product Name").not().isEmpty(),
  check("description", "Enter product description").not().isEmpty(),
  check("price", "Enter Product Price").not().isEmpty(),
  check("image", "Add Image Link").not().isEmpty(),
  check("stock", "Enter product stock").not().isEmpty(),
  check("capacities", "Capacities is required").not().isEmpty(),
  check("capacities.*.capacity", "Capacity name is required").not().isEmpty(),
  check("capacities. *.price_capacity", "Capacity Price is required").not().isEmpty(),
  check("capacities.*.color_name", "Color name is required").not().isEmpty(),
  check("capacities.*.image", "Image is required").not().isEmpty(),
  check("status", "Status is required").not().isEmpty(),

  async (req, res) => {
    const {
      id
    } = req.params;
    const {
      category_id,
      description,
      product_name,
      price,
      stock,
      capacities,
      status,
      price_sale,
      image_preview
    } = req.body;
    try {
      const product = await ProductsModel.findByIdAndUpdate(id, {
        category_id,
        product_name,
        description,
        price,
        image_preview,
        stock,
        capacities,
        status,
        price_sale
      }, {
        new: true
      }); // Returns the updated document

      if (!product) {
        return res.status(404).json({
          message: 'Product not found'
        });
      }

      res.json({
        message: 'Product updated successfully',
        product
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: 'Server Error'
      });
    }
  });

router.delete("/delete/:id", async (req, res) => {
  const {
    id
  } = req.params;

  try {
    const deletedProduct = await CategoriesModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json({
      message: "Product deleted successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
});

app.use(function (err, req, res, next) {
  console.log('This is the invalid field ->', err.field)
  next(err)
})


module.exports = router;
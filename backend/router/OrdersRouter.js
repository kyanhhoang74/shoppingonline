const express = require("express");
const router = express.Router();
const OrdersModel = require("../models/OrdersModel");
const { check, validationResult } = require("express-validator/check");
const ProductsModel = require("../models/ProductsModel");

router.get("/all_orders", async (req, res) => {
  const orders = await OrdersModel.find({}).populate('product_id')
  const formattedOrders = orders.map(order => {
    const product = order.product_id; 
    const user = order.user_id;// Access populated product data

    
    return {
      // ...other order fields
      user: user,
      product : product,
      order: order._id,
      order_price: order.price,
      qty: order.qty,
      status: order.status
    };
  });
  console.log(formattedOrders)

  res.json(formattedOrders);

});
router.get("/get_order/:id", async (req, res) => {
  const { id } = req.params;

  const order = await OrdersModel.findById(id);

  if (!order) {
    res.json({ message: "order not found", status: 0 });
    return;
  }

  res.json(order);
});

router.get("/get_order_user/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const { status } = req.query;

  try {
    const query = { user_id };
    if (status) {
      query.status = status;
    }

    const orders = await OrdersModel.find(query).populate('product_id'); // Populate product details
    console.log("a",orders)


    if (!orders || orders.length === 0) {
      return res.json({ message: "Order not found get_order_user", status: 0 });
    }

    const formattedOrders = orders.map(order => {
      const product = order.product_id; // Access populated product data

      
      return {
        // ...other order fields
        product : product,
        order_id : order._id,
        order_price: order.price,
        qty: order.qty,
        status: order.status
      };
    });

    res.json(formattedOrders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});



router.post(
  "/addorder",
  check("user_id", "Enter user_id").not().isEmpty(),
  check("product_id", "product name is required").not().isEmpty(),

  async (req, res) => {
    const { user_id, product_id, shippingAddress, paymentStatus, shippingStatus } = req.body;
    const product = await ProductsModel.findById(product_id);
    const price = product.price

    if (!product) {
      return res.status(400).json({ message: "Invalid product ID", status: 0 });
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if   order with same product ID exists for current user
      const existingOrder = await OrdersModel.findOne({
        user_id,
        product_id,
      });

      if (existingOrder && existingOrder.status == 0) {
        // Update existing order with increased quantity
        existingOrder.qty++;
        await existingOrder.save();

        res.send({ message: "Order quantity updated", status: 1, existingOrder });
      } else {
        // Create new order if no existing one found
        const newOrder = new OrdersModel({
          user_id,
          product_id,
          qty: 1, // Initial quantity is 1
          price,
          shippingAddress,
          paymentStatus,
          shippingStatus,
        });

        await newOrder.save();

        res.send({ message: "Order added", status: 1, newOrder });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Error adding order", status: 0 });
    }
  }
);

router.put('/editqtyorder/:id',
  check("user_id", "Enter user_id").not().isEmpty(),
  check("[product_id", "product name is required").not().isEmpty(),

  async (req, res) => {
    const { id } = req.params;
    const { user_id, product_id, shippingAddress, paymentStatus, shippingStatus } = req.body;

    try {
      const order = await OrdersModel.findById(id);

      if (!order) {
        return res.status(404).json({ message: 'Order not found editqtyorder' });
      }

      if (order.qty <= 1) {
        return res.status(400).json({ message: 'Minimum quantity reached' });
      }

      const updatedOrder = await OrdersModel.findByIdAndUpdate(id, {
        user_id,
        product_id,
        shippingAddress,
        paymentStatus,
        shippingStatus,
        qty: order.qty - 1, // Decrement qty by 1
      }, { new: true });

      res.json({ message: 'Order updated successfully', order: updatedOrder, status: 1 });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error', status: 0 });
    }
  }
);

router.put('/editOrderStatus/:id', async (req, res) => {
  const { id } = req.params;
  console.log("aaaaaaa", id)

  try {
      const order = await OrdersModel.findById(id);
  

      if (!order) {
          return res.status(404).json({ message: 'Order not found editOrderStatus' });
      }

      // Update the status to 1
      order.status = 1;
      await order.save();

      res.json({ message: 'Order status updated successfully', order, status: 1 });
  } catch (error) {
      console.error(error);
      res.status(500).json({   
message: 'Server Error', status : 0 });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await OrdersModel.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order deleted successfully", status: 1 });
  } catch   
  (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", status: 0 });
  }
});

module.exports = router;

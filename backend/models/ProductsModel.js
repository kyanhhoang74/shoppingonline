const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Foreign key referencing Customer
    required: true
  },
  product_name: {
    type: String,
    required: true
  },
  capacities: [{
    capacity: {
      type: String,
      required: true
    },
    price_capacity: {
      type: Number,
      required: true
    },
    color_name: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
  }],

  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image_preview: {
    type: String
  },
  stock: {
    type: Number,
    default: 0
  },
  price_sale: {
    type: Number,
    default: 0
  },
  status: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('Product', productSchema);
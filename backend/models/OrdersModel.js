const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer' // Foreign key referencing Customer
    },

    product_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product' // Foreign key referencing Product
    },
    
    orderDate: {
        type: Date,
        default: Date.now
    },
    qty:{
        type: Number,
        default: 1
    },
    price:{
        type: Number,
    },
    status:{
        type: Number,
        default: 0
    },
    shippingAddress: {
        type: String,
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'refunded'],
        default: 'pending'
    },
    shippingStatus: {
        type: String,
        enum: ['pending', 'shipped', 'delivered'],
        default: 'pending'
    },
});
orderSchema.virtual('product', {
    ref: 'Product',
    localField: 'product_id',
    foreignField: '_id'
  });

orderSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Order', orderSchema);
import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  items: [{
    _id: { type: String, required: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    newPrice: { type: Number, required: true },
    cartQuantity: { type: Number, required: true },
  }],
  shipping: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    method: { type: String, required: true },
    cost: { type: Number, required: true },
  },
  payment: {
    method: { type: String, required: true },
    total: { type: Number, required: true },
  },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema) 
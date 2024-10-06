const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  order: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  takenBy: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
})

module.exports = mongoose.model('Order', OrderSchema)

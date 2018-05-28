const mongoose = require('mongoose');
const { Schema } = mongoose;

const priceHistorySchema = new Schema(
  {
    date: String,
    price: Number
  }
)

module.exports = priceHistorySchema;
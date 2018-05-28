const mongoose = require('mongoose');
const { Schema } = mongoose;

const productOriginSchema = new Schema(
  {
    title: {
      type: String,
      index: true
    },
    amount: Number,
    units: String,
    lang: String,
    country: String
  }
);

mongoose.model('product_origins', productOriginSchema);
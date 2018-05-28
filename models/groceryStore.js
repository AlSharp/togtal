const mongoose = require('mongoose');
const { Schema } = mongoose;

const priceHistorySchema = require('./priceHistory');

const productSchema = new Schema(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      index: true
    },
    price_histories: [priceHistorySchema]
  }
)

const groceryStoreSchema = new Schema(
  {
    name: String,
    loc: {
      type: [Number],
      index: '2dsphere'
    },
    products: [productSchema]
  }
);

mongoose.model('grocerystores', groceryStoreSchema);
const mongoose = require('mongoose');
const GroceryStore = mongoose.model('grocerystores');
const ProductOrigin = mongoose.model('product_origins');

module.exports = app => {
  // get polygon from google map viewport
  function getPolygon(req) {
    let north = parseFloat(req.query.north);
    let south = parseFloat(req.query.south);
    let east = parseFloat(req.query.east);
    let west = parseFloat(req.query.west);
    let northwest = [west, north];
    let northeast = [east, north];
    let southeast = [east, south];
    let southwest = [west, south];
    let polygon = [northwest, northeast, southeast, southwest, northwest];
    return polygon;
  }

  app.post('/api/v1/places/grocery_stores', (req, res) => {
    if (req.body.products.length > 0) {
      ProductOrigin.create(req.body.products)
        .then(products => {
          products.map((product, index) => {
            req.body.products[index].product_id = product._id;
          });
          GroceryStore.create(
            {
              name: req.body.name,
              loc: [req.body.location.long, req.body.location.lat],
              products: req.body.products
            }
          )
            .then(store => res.send(store))
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    } else {
      GroceryStore.create(
        {
          name: req.body.name,
          loc: [req.body.location.long, req.body.location.lat]
        }
      )
        .then(store => res.send(store))
        .catch(error => console.log(error));
    }
  });

  app.get('/api/v1/places/grocery_stores/filter', (req, res) => {
    GroceryStore.find().where('loc').within({ polygon: getPolygon(req) })
      .exec(function(error, result) {
        if(error) {
          res.status(500).send(error);
        }
        res.send(result);
      });
  });
}
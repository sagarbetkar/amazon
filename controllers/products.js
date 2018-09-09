const Product = require('../models/products');

exports.postNewProduct = (req, res) => {
  console.log(req.body);
  let {
    productName,
    category,
    techdetails,
    productimgs,
    description,
    price,
    createdAt,
    modifiedAt,
    rating
  } = req.body;

  var product = new product({
    productName,
    category,
    techdetails,
    productimgs,
    description,
    price,
    createdAt,
    modifiedAt,
    rating
  });
  product.save().then((product) => {
    console.log('Added successfully');
    res.json(product);
  })
};

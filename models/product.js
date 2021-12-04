const mongoose = require("mongoose");
mongoose.pluralize(null);

const productSchema = mongoose.Schema({
   product_id : String,
title : String,
price : String,
category :String,
company_id : String,
seller_id : String
});

const userModel = mongoose.model("product",productSchema);

module.exports = userModel;
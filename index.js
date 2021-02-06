var http = require('http');
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var $numberInt = require("mongodb").Int32;
var ODataServer = require('simple-odata-server');
var Adapter = require('simple-odata-server-mongodb')
var cors = require("cors");
var url = "mongodb://localhost:27017/my_db";

// Create app variable to initialize Express 
var app = express();

// Enable Cross-origin resource sharing (CORS)  for app.



// var productsSchema = new mongoose.Schema()
var odata = require('node-odata');
var server = odata(url);

server.resource('products', { sku: String, ean: String, product_name: String, brand_name: String, manufracturer: String, 
    product_dimension: { length: { type: String }, width: { type: String }, height: {type: String}, weight: {type: String} },
     season: { winter: { type: Number }, summer : { type: Number }, autumn: {type : Number} } });

server.listen(3000);

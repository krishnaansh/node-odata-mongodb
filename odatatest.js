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
// var server = odata(url);

// server.resource('products', { sku: String, ean: String, product_name: String, brand_name: String, manufracturer: String, 
//     product_dimension: { length: { type: String }, width: { type: String }, height: {type: String}, weight: {type: String} },
//      season: { winter: { type: Number }, summer : { type: Number }, autumn: {type : Number} } });

// server.listen(3000);

var model = {
    namespace: "my_db",
    entityTypes: {
        "product": {
            "_id": { "type": "Edm.String", key: true },
            "sku": { "type": "Edm.String" },
            "ean": { "type": "Edm.String" },
            "product_name": { "type": "Edm.String" },
            "brand_name": { "type": "Edm.String" },
            "manufracturer": { "type": "Edm.String" },
            "product_dimension": { "length": { "type": "Edm.String" }, "width": { "type": "Edm.String" }, "height": { "type": "Edm.String" }, "weight": { "type": "Edm.String" } },
            "season": { "winter": { "type": "Edm.String" }, "summer": { "type": "Edm.String" }, "autmn": { "type": "Edm.String" } },
        }
    },
    entitySets: {
        "products": {
            entityType: "my_db.product"
        }
    }
};

// var odataServer = ODataServer("http://127.0.0.1")
//     .model(model)
//     .adapter(Adapter(function (es, cb) { cb(null, db) }));


// Instantiates ODataServer and assigns to odataserver variable.
var odataServer = ODataServer()
    .model(model);

app.use(cors(odataServer.cors('*')));
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database created!");
    odataServer.adapter(Adapter(function (cb) {
        
        cb(err, db.db('my_db'));
    }));
});

app.use("/odata12", function (req, res) {    
    odataServer.handle.bind(req, res);
});


// The app listens on port 3010 and prints the endpoint URI in console window.
var server = app.listen(3010, function () {
    console.log('Server running at http://127.0.0.1:3010/');
});
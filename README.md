#Odata with node js

git clone this project 
after cloning 
1. npm install package.json
2. node index.js
3.http://localhost:3000/products/   # get method (all details of collections) 

4. Post method curl 
curl --location --request POST 'http://localhost:3000/products/' \
--header 'Content-Type: application/json' \
--data-raw '{

    "sku": "2",
    "ean": "2",
    "product_name": "krishnwa",
    "brand_name": "krish",
    "manufracturer": "k",
    "product_dimension": {
        "length": 200,
        "width": 200,
        "height": 200,
        "weight": 400
    },
    "season": {
        "winter": 0,
        "summer": 1,
        "autumn": 2
    }
}'

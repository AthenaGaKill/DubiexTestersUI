var express = require("express");
var app = express();
var request = require("request"); //add request package to the file

app.set("view engine", "ejs"); //allows us to send data to ejs templates

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("searchid");
});

//orders
app.get("/allorders", function (req, res) { //this route path will match req to root /allorders
    var searchQuery = req.query.ordersearch; //get the data that was put in name on searchid.js
    var url = "http://localhost:5433/orders";
    //request the api
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) { //if no error and the page loads fine we continue...
            var orderInfo = JSON.parse(body); // turn body's string format to an object
            res.render("allOrders", { orderInfo: orderInfo, searchQuery: searchQuery }); //renders the template and passes on data (all data from the body in object form) to ejs file
            // this allows us to pass on vars we can use in the ejs file
        }
    });
});

//markets
app.get("/markets", function (req, res) { 
    var searchQuery = req.query.marketsearch;
    var url = "http://localhost:5433/markets";
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) { 
            var marketsInfo = JSON.parse(body); 
            res.render("markets", { marketsInfo: marketsInfo, searchQuery: searchQuery });             
        }
    });
});

app.listen(1337, function () {
    console.log("Server started!");
});


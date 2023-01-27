var express = require("express");
var app = express();
var db = require("./database.js");
var cron = require('node-cron');
var bodyParser = require("body-parser");
const { request, response } = require("express");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let HTTP_PORT = 8080;
const cors = require('cors');
app.use(cors({
    origin: '*'
}));



// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});


app.post("/api/customer/", (req, res, next) => {

    try {
        var errors = []

        if (!req.body) {
            errors.push("An invalid input");
        }

        const {name, 
            address,
            email,
            dateOfBirth,
            gender,
            age,
            cardHolderName,
            cardNumber,
            expiredDate,
            cvv,
            timeStamp
        } = req.body;

        var sql = 'INSERT INTO customer (name,address,email,dateOfBirth,gender,age,cardHolderName,cardNumber,expiredDate,cvv,timeStamp) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
        var params = [name,address,email,dateOfBirth,gender,age,cardHolderName,cardNumber,expiredDate,cvv,timeStamp]
        db.run(sql, params, function (err, result) {

            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            } else {
                res.json({
                    "message": "customer has registered",
                    "customerId": this.lastID
                })
            }

        });
    } catch (E) {
        res.status(400).send(E);
    }
});

/*
app.get("/api/customer", (req, res, next) => {

    try {
        var sql = "select * from customer"
        var params = []
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "success",
                "data": rows
            })
        });
    } catch (E) {
        res.status(400).send(E);
    }
});
*/

// Root path
app.get("/", (req, res, next) => {
    res.json({ "message": "Udith Induwara" })
});


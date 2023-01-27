var sqlite3 = require('sqlite3').verbose();
var md5 = require('md5');

const DBSOURCE = "db.sqlite";


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQlite database.')
        db.run(`CREATE TABLE customer (
            customerId INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            address text,
            email text,
            dateOfBirth text,
            gender text,
            age INTEGER,
            cardHolderName text,
            cardNumber INTEGER,
            expiredDate text,
            cvv INTEGER,
            timeStamp text
            )`, (err) => {
            if (err) {
                // Table already created
            } else {
                // Table just created, creating some rows
                var insert = 'INSERT INTO customer (name,address,email,dateOfBirth,gender,age,cardHolderName,cardNumber,expiredDate,cvv,timeStamp) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
                db.run(insert, ["Nimal kumara", "no 32,kegalle road,galigamuwa", "nimal@uib.com", "1998.05.23", "male", "25", "N.Kumara", 5941123645891450, "05/2029", 020, "2023-01-15 13:54:49"])
            }
        })


    }
})

module.exports = db;


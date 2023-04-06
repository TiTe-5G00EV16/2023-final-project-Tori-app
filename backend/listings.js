const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const listings = {
    findAll: () => new Promise((resolve, reject) => {
        connection.query("SELECT * FROM listings", (err, result) => {
            if (err) {
              return reject(err);
            }
            resolve(result);
          });
    }),

    close: () => new Promise((resolve, reject) => {
        connection.end((err) => {
        if (err) {
            return reject(err);
        }
        resolve("Connection Closed");
        });
    }),

    create: (listing) => new Promise((resolve, reject) => {
        connection.query('INSERT INTO listings SET ?', listing, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    })
};

module.exports = listings;
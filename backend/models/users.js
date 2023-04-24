const pool = require('../db/pool');

const users = {
  create: (user) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) {
        return reject(err);
      }
      connection.query('INSERT INTO users SET ?;', user, (err, result) => {
        connection.release();
        if(err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }),
  findByEmail: (email) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) {
        return reject(err);
      }
      connection.query('SELECT * FROM users WHERE email LIKE ?;', email, (err, result) => {
        connection.release();
        if(err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  findOwnerById: (userId) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) {
        return reject(err);
      }
      connection.query(`SELECT name, email FROM users WHERE id=?;`, userId, (err, result) => {
        connection.release();
        if(err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  })
}

module.exports = users
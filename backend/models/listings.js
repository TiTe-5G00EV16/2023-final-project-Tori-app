const db = require('../db/pool');

const listings = {
  findAll: () => new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err)
        return reject(err);

      connection.query('SELECT * FROM listings;', (err, result) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  findById: (id) => new Promise((resolve, reject) => {
    const selectQuery = 'SELECT * FROM listings WHERE id=?;';
    db.getConnection((err, connection) => {
      if (err){
        return reject(err);
      }
      connection.query(selectQuery, id, (err, result) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  save: (listing) => new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err)
        return reject(err);

      connection.query('INSERT INTO listings SET ?', listing, (err, result) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  deleteById: (id) => new Promise((resolve, reject) => {
    const deleteQuery = 'DELETE FROM listings WHERE id=?;';
    db.getConnection((err, connection) => {
      if (err)
        return reject(err);

      connection.query(deleteQuery, id, (err, result) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  updateById: (listings) => new Promise((resolve, reject) => {
    const updateQuery = 'UPDATE listings SET name = ?, price = ? WHERE id = ?;';
    db.getConnection((err, connection) => {
      if (err)
        return reject(err);

      connection.query(updateQuery, [listings.name, listings.price, listings.id], (err, result) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
};
module.exports = listings;
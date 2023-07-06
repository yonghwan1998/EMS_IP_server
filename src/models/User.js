'use strict';

const db = require('../config/db');

class UserStorage {
  static getUserInfo(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE UserID = ?;";

      db.query(query, [id], (err, data) => {
        if (err) reject(err);
        else resolve(data[0]);
      });
    });
  }

  static userRegistration(id, pw, telContact, telElder, address) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO users (UserID, UserPWD, UserContactProtector, UserContactElder, UserResidence) VALUES (?, ?, ?, ?, ?)";

      db.query(query, [id, pw, telContact, telElder, address], (err, data) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  static getUserID(tel) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE UserContactProtector = ?;";

      db.query(query, [tel], (err, data) => {
        if (err) reject(err);
        else resolve(data[0]);
      });
    });
  }

  static resetPW(encryptedPW, id) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE users SET UserPWD = ? WHERE UserID = ?;";

      db.query(query, [encryptedPW, id], (err, data) => {
        if (err) reject(err);
        else resolve(data[0]);
      });
    });
  }
  // complete
  static getUserSubEmail(name) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE name = ?;";

      db.query(query, [name], (err, data) => {
        if (err) reject(err);
        else resolve(data[0]);
      });
    });
  }

  static getUserEmail(subEmail) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE subEmail = ?;";

      db.query(query, [subEmail], (err, data) => {
        if (err) reject(err);
        else resolve(data[0]);
      });
    });
  }
}

module.exports = UserStorage;
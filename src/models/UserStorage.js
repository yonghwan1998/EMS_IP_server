'use strict';

const db = require('../config/db');

class UserStorage {
  static getUserInfo(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE id = ?;";

      db.query(query, [id], (err, data) => {
        if(err) reject(err);
        else resolve(data[0]);
      });
    });
  }

  static getUserSubEmail(name) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE name = ?;";

      db.query(query, [name], (err, data) => {
        if(err) reject(err);
        else resolve(data[0]);
      });
    });
  }

  static getUserEmail(subEmail) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE subEmail = ?;";

      db.query(query, [subEmail], (err, data) => {
        if(err) reject(err);
        else resolve(data[0]);
      });
    });
  }

  static resetPW(encryptedPW, id) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE users SET pw = ? WHERE id = ?;";

      db.query(query, [encryptedPW, id], (err, data) => {
        if(err) reject(err);
        else resolve(data[0]);
      });
    });
  }

  static setLoginCookie(id, token, identifier) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO cookies (id, token, identifier) values (?, ?, ?);";

      db.query(query, [id, token, identifier], (err, data) => {
        if(err) reject(err);
        else resolve(data[0]);
      });
    });
  }

  static inquireDB(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM cookies WHERE id = ?;";

        db.query(query, [id], (err, data) => {
          if(err) reject(err);
          else resolve(data[0]);
        });
    });
  }

  static getCookieInfo(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM cookies WHERE id = ?;";

      db.query(query, [id], (err, data) => {
        if(err) reject(err);
        else resolve(data[0]);
      });
    });
  }

  static returnLoginTest() {
    return new Promise((resolve, reject) => {
      const query = "USE login_test;";

      db.query(query, (err, data) => {
        if(err) reject(err);
        else resolve(data[0]);
      });
    });
  }

  static returnCookieTest() {
    return new Promise((resolve, reject) => {
      const query = "USE cookie_test;";

      db.query(query, (err, data) => {
        if(err) reject(err);
        else resolve(data[0]);
      });
    });
  }
}

module.exports = UserStorage;
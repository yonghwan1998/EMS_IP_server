'use strict';

const mysql = require("mysql");

const db = mysql.createConnection({
  host: 'tera.dscloud.me',
  port: '3307',
  user: 'emsBackend',
  password: 'TUKoreaEMS3881!!',
  database: 'ems_web',
});

db.connect();

module.exports = db;
'use strict';

const crypto = require('crypto');

function encrypt(userpw) {
  const cryptoPassword = crypto.createHash('sha256', process.env.SALT)
    .update(userpw)
    .digest('hex')
    .replace('==', '').replace('=', '');

  return cryptoPassword;
}

module.exports = encrypt;

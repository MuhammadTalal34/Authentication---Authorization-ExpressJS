const crypto = require('crypto');

const TOKEN_SECRET = crypto.randomBytes(64).toString('hex');

// console.log(TOKEN_SECRET);

module.exports = {
    TOKEN_SECRET: TOKEN_SECRET, // Replace 'your_secret_key' with your actual secret key
};
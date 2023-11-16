// SquareBaseURL.js
const axios = require('axios');
const squareAccessToken = process.env.SQUARE_ACCESS_TOKEN;
const squarebaselink = process.env.SqureBaseURL;

const SquareBaseURL = axios.create({
  baseURL: squarebaselink,
  headers: {
    'Authorization': `Bearer ${squareAccessToken}`,
    'Square-Version': '2023-10-18',
    'Content-Type': 'application/json',
  }
});

module.exports = SquareBaseURL;

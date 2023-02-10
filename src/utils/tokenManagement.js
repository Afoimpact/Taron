// require('dotenv').config();
const dotenv = require('dotenv');
dotenv.config();
// const jwt = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
// import { values } from '../../key';

let token_secret = process.env.SECRET;

const generateToken = (data) => {
  const access_token = jwt.sign(data, token_secret, {
    expiresIn: '10000h',
  });
  const refresh_token = jwt.sign(data, token_secret, {
    expiresIn: '1d',
  });
  return {
    access_token,
    refresh_token,
  };
};
const generateAdminToken = (data) => {
  const access_token = jwt.sign(data, token_secret, {
    expiresIn: '60000h',
  });
  const refresh_token = jwt.sign(data, token_secret, {
    expiresIn: '1d',
  });
  return {
    access_token,
    refresh_token,
  };
};

const verifyToken = (token) => {
  const data = jwt.verify(token, token_secret);
  return data;
};

module.exports = { generateToken, generateAdminToken, verifyToken };

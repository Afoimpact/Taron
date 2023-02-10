const httpStatus = require('http-status');
const { abortIf } = require('../utils/responder');
const { verifyToken } = require('../utils/tokenManagement');

const verify = (req, res, next) => {
  abortIf(
    !req.headers['authorization'],
    httpStatus.FORBIDDEN,
    'token expired please login'
  );
  const token = req.headers['authorization'].split(' ')[1];
  abortIf(
    !token || token == '',
    httpStatus.FORBIDDEN,
    'token expired please login'
  );
  req.auth = {}
  const data = verifyToken(token);
  const user_id = data['_id'];
  const email = data['email'];
  req.auth.user_id = user_id;
  req.auth.email = email;
  next();
};

module.exports = { verify };

const bcrypt = require('bcryptjs');
const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()><?/"][}{|+=-_`~:;';
const generate_random_password = (number = 8) => {
  let result = '';
  const charactersLength = characters.length;
  for (var i = 0; i < number; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const hash = async (text) => {
  const salt = await bcrypt.genSaltSync(10);
  const hashed_password = await bcrypt.hashSync(text, salt);
  return hashed_password;
};

const compare_passwords = async (
  incoming_password,
  password_on_db
) => {
  const check = await bcrypt.compare(incoming_password, password_on_db);
  return check;
};

module.exports = {
  generate_random_password,
  hash,
  compare_passwords,
};

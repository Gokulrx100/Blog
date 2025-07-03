const bcrypt = require("bcrypt");
const saltRounds = 10;

async function passwordHash(password) {
  try {
    let hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (err) {
    throw err;
  }
}

module.exports = passwordHash;
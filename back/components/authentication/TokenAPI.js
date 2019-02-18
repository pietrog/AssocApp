//crypto
const Logger = require('../logger').logger;
const bcrypt = require('bcrypt'),
      jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;
const PRIVATE_KEY = 'MEGASECRETPRIVATE_KEY_SILESSIO';
//const MAX_VALIDITY_TOKEN = "60s"; // Number of ms for a token validity (3 hours)
const MAX_VALIDITY_TOKEN = "1h"; // Number of ms for a token validity (3 hours)


/**
 * Generates a token with jwt library
 */
const generateToken = async (name) => {
    //generate the token to send to the user
    const now = Date.now();
    const payload = { login: name, date: now }; //payload -> valid json object
    const options = { expiresIn: MAX_VALIDITY_TOKEN };
    const token = await jwt.sign(payload, PRIVATE_KEY, options);
    return token;
};

const verifyToken = async (token) => {
    try {
	const decoded = await jwt.verify(token, PRIVATE_KEY);
	return decoded;
    }
    catch (err) {
	Logger.warn('Wrong token or expired received');
	return false;
    }
};

/**
 * Takes a plain text password and hash it with salt
 */
const hashPassword = (plain_text_password) => {
    return bcrypt.hash(plain_text_password, SALT_ROUNDS);
};

const comparePasswords = (plain_text_password, hash) => {
    return bcrypt.compare(plain_text_password, hash);
}

module.exports = {
    generateToken: generateToken,
    hashPassword: hashPassword,
    comparePasswords: comparePasswords,
    verifyToken: verifyToken
}

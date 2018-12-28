const AuthenticatedUserDAL = require('./AuthenticatedUserDAL').DAL,
      TokenAPI = require('./TokenAPI'),
      Logger = require('../logger').logger;


const findAuthenticatedUserByName = (name) => {
    return AuthenticatedUserDAL.findAuthenticatedUserByName(name);
};
module.exports.findByName = findAuthenticatedUserByName;

const isFirstConnection = () => {
    return AuthenticatedUserDAL.isFirstConnection();
};
module.exports.isFirstConnection = isFirstConnection;

/**
 * Creates a new admin user. Takes a plain_text_password and hash it here
 */
const createAuthenticatedUser = async (name, plain_text_password, email, isAdmin) => {
    //hash the password to store it crypted
    try {
	const hash = await TokenAPI.hashPassword(plain_text_password);
	Logger.info('Hash of password generated');
	return AuthenticatedUserDAL.addAuthenticatedUser(name, hash, email, isAdmin);
    }
    catch (err) {
	Logger.error('Error occured while hashing password: '+ err);
	return null;
    }
}

const createAdmin = async (name, plain_text_password, email) => {
    return createAuthenticatedUser(name, plain_text_password, email, true);
}

const createNotAdmin = async (name, plain_text_password, email) => {
    return createAuthenticatedUser(name, plain_text_password, email, false);
}
module.exports.createAdmin = createAdmin;
module.exports.createNotAdmin = createNotAdmin;

/**
 * Authenticate an user by name and password. If used is found and password matches, user is authenticated
 */
const loginUser = async (name, plain_text_password) => {
    const user = await AuthenticatedUserDAL.findAuthenticatedUserByName(name);
    if (user === null) {
	return null;
    }

    //compare passwords
    const valid_password = await TokenAPI.comparePasswords(plain_text_password, user.hash);
    if (!valid_password) {
	Logger.warn('User ' + name + ' entered an invalid password');
	return null;
    }

    Logger.info('User ' + name + ' has been authenticated');

    //generates the token
    const token = await TokenAPI.generateToken(name);

    const result = {
	login: name,
	email: user.email,
	isAdmin: user.isAdmin,
	token: token
    };

    return result;
}
module.exports.loginUser = loginUser;

/**
 * Check if the token is valid
 */
const authenticateUser = async (name, token) => {
    const isValidToken = await TokenAPI.verifyToken(name, token);
    return isValidToken;
};
module.exports.authenticateUser = authenticateUser;

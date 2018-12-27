const assert = require('assert').strict,
      mongoose = require('mongoose'),
      util = ('util');

const AuthenticatedUserAPI = require('./AuthenticatedUserAPI'),
      AuthenticatedUserSchema = require('./AuthenticatedUserSchema'),
      TokenAPI = require('./TokenAPI'),
      Logger = require('../logger').logger,
      config = require('../../config.js');


describe('Authentication Component', function() {
    before(() => {
	mongoose.connect(config.unittestdatabase, { useNewUrlParser: true});
	Logger.level = 'silent';
    });

    beforeEach( async () => {
	await AuthenticatedUserSchema.deleteMany({});
    });

    describe('AuthenticatedUserAPI', async function() {
	
	it('should create the first admin with well encrypted password', async () => {
	    const pwd = "pwd261054;liLY??!-Ytd00";
	    const res = await AuthenticatedUserAPI.createAdmin("admin", pwd, "admin@silessio.com");
	    const found = await AuthenticatedUserAPI.findByName("admin");

	    assert.equal(found.login, "admin");
	    assert.equal(found.isAdmin, true);
	    assert(typeof(found._id) === 'object', "Expects a mongoose id following the creation");
	    const comparison_true = await TokenAPI.comparePasswords(pwd, found.hash);
	    const comparison_false = await TokenAPI.comparePasswords(pwd+",", found.hash);
	    assert(comparison_true, "Expects password to match");
	    assert(!comparison_false, "Expects password not to match");
	});

	it('should create the first non admin with well encrypted password', async () => {
	    const pwd = "o_sèz$**dzù':&$ùd*qzs456DFGfzf";
	    const res = await AuthenticatedUserAPI.createNotAdmin("Youssef", pwd, "youss@silessio.com");
	    const found = await AuthenticatedUserAPI.findByName("Youssef");

	    assert.equal(found.login, "Youssef");
	    assert.equal(found.isAdmin, false);
	    assert(typeof(found._id) === 'object', "Expects a mongoose id following the creation");
	    const comparison_true = await TokenAPI.comparePasswords(pwd, found.hash);
	    const comparison_false = await TokenAPI.comparePasswords(pwd+",", found.hash);
	    assert(comparison_true, "Expects password to match");
	    assert(!comparison_false, "Expects password not to match");
	});

	
	it('should return true for first connection to DB', async () => {
	    const res = await AuthenticatedUserAPI.isFirstConnection();
	    assert(res, "Expects isFirstConnection to return true!");
	});

	it('should return true for first connection to DB even a non admin user exists', async () => {
	    await AuthenticatedUserAPI.createNotAdmin("Vador", "darkPwd", "dark@vador.com");
	    const res = await AuthenticatedUserAPI.isFirstConnection();
	    assert(res, "Expects isFirstConnection to return true!");	    
	});

	it('should return false for first connection to DB because an admin exists', async () => {
	    await AuthenticatedUserAPI.createAdmin("Vador", "darkPwd", "dark@vador.com");
	    const res = await AuthenticatedUserAPI.isFirstConnection();
	    assert(!res, "Expects isFirstConnection to return true!");	    
	});

	it('should login an admin user', async() => {
	    const password = "lqhdf87à;,$Jùdz9!%dopPAJ";
	    await AuthenticatedUserAPI.createAdmin("Vador", password, "dark@vador.com");
	    const res = await AuthenticatedUserAPI.loginUser("Vador", password);
	    assert.equal(res.login, "Vador", "Expects to return the login name");
	    assert.equal(res.email, "dark@vador.com", "Expects to return the same inputed email");
	    assert(res.token, "Expects a token");
	    assert.equal(res.isAdmin, true, "Expects to be an admin");
	    assert(TokenAPI.verifyToken("Vador", res.token), "Expects the token to be valid");
	});

	it('should authenticate an admin user', async() => {
	    const password = "lqhdf87à;,$Jùdz9!%dopPAJ";
	    await AuthenticatedUserAPI.createAdmin("Vador", password, "dark@vador.com");
	    const res = await AuthenticatedUserAPI.loginUser("Vador", password);
	    const token = res.token;
	    const isAuthentic = await AuthenticatedUserAPI.authenticateUser("Vador", token);
	    assert(isAuthentic, "Expects the user to be authenticated");
	});

	it('should not authenticate an admin user', async() => {
	    const password = "lqhdf87à;,$Jùdz9!%dopPAJ";
	    await AuthenticatedUserAPI.createAdmin("Vador", password, "dark@vador.com");
	    const res = await AuthenticatedUserAPI.loginUser("Vador", password);
	    const token = res.token + "r";
	    const isAuthentic = await AuthenticatedUserAPI.authenticateUser("Vador", token);
	    assert(!isAuthentic, "Expects the user to be authenticated");
	});

	
    });
    
});

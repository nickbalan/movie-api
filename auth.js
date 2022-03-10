const jwtSecret = 'your_jwt_secret';
const jwt = require('jsonwebtoken');
const passport = require('passport');

require('./passport'); // the local passport file

/**
 * @description Generates a JWT for a user and returns the token as a string
 * @method generateJWTToken
 * @param {object} user Object containing all of the users data
 * @returns {string} - JWT for the logged in user
 */
let generateJWTToken = (user) => {
	return jwt.sign(user, jwtSecret, {
		subject: user.Username,
		expiresIn: '7d', // The token expires in 7 days
		algorithm: 'HS256' // The algorithm used to 'sign' or encode the values of the JWT
	});
}

/**
 * @description Endpoint to login the user
 * @method POST LoginUser
 * @param {string} endpoint - /login?Username=[Username]&Password=[Password]
 * @returns {object} - JSON object containing data for the user and a new JWT. 
 * { user: {  
 *   _id: <string>,  
 *   Username: <string>,
 *   Password: <string> (hashed),  
 *   Email: <string>,  
 *   Birthday: <string>,  
 *   Watchlist: [<string>]  
 *   },   
 *   token: <string>   
 * }
 */
// POST login. LocalStrategy
module.exports = (router) => {
	router.post('/login', (req, res) => {
		passport.authenticate('local', { session: false }, (error, user, info) => {
			if (error || !user) {
				return res.status(400).json({
					message: 'Something is wrong. Try again.',
					user: user
				});
			}
			req.login(user, { session: false }, (error) => {
				if (error) {
					res.send(error);
				}
				let token = generateJWTToken(user.toJSON());
				return res.json({ user, token });
			});
		})(req, res);
	});
}


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Models = require('./models.js');
const passportJWT = require('passport-jwt');

let Users = Models.User;
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

/**
 * @description Middleware logic for checking login credentials for a user.
 * Function is called when a user logs in.
 * First ensures the user exists, then checks that the password is correct.
 * @method loginStrategy
 * @returns {boolean} Returns true if credentials are valid, false otherwise
 */
passport.use(new LocalStrategy({
	usernameField: 'Username',
	passwordField: 'Password'
}, (username, password, callback) => {
	console.log(username + ' ' + password);
	Users.findOne({ Username: username }, (error, user) => {
		if (error) {
			console.log(error);
			return callback(error);
		}

		if (!user) {
			console.log('Incorrect username');
			return callback(null, false, { message: 'Incorrect username.' });
		}

		if (!user.validatePassword(password)) {
			console.log('Incorrect password');
			return callback(null, false, { message: 'Incorrect password.' });
		}

		console.log('finished');
		return callback(null, user);
	});
}));

/**
* @description Middleware logic for checking JWT of a user. <br>
* Function is called to check validation before accessing restricted endpoints.<br>
* Decodes the JWT and then checks to see if the encoded user exists on the server
* @method jwtStrategy
* @returns {boolean} Returns true if JWT is valid, false otherwise
*/
passport.use(new JWTStrategy({
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
	secretOrKey: 'your_jwt_secret'
}, (jwtPayload, callback) => {
	return Users.findById(jwtPayload._id)
		.then((user) => {
			return callback(null, user);
		})
		.catch((error) => {
			return callback(error)
		});
}));

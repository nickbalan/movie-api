const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
	Title: {type: String, require: true},
	Description: {type: String, require: true},
	Genre: [{type: mongoose.Schema.Types.ObjectId, ref: 'genre'}],
	Director: [{type: mongoose.Schema.Types.ObjectId, ref: 'director'}],
	ImageUrl: String,
	Featured: Boolean
});

let userSchema = mongoose.Schema({
	Username: {type: String, require: true},
	Password: {type: String, require: true},
	Email: {type: String, require: true},
	Birthday: Date,
	favoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'movie'}]
});

let directorSchema = mongoose.Schema({
	Name: {type: String, require: true},
	Bio: {type: String, require: true},
	Birth: Date,
	Death: Date
});

let genreSchema = mongoose.Schema({
	Name: {type: String, require: true},
	Description: {type: String, require: true},
});

let movie = mongoose.model('movie', movieSchema);
let user = mongoose.model('user', userSchema);
let director = mongoose.model('director', directorSchema);
let genre = mongoose.model('genre', genreSchema);

module.exports.movie = movie;
module.exports.user= user;
module.exports.director = director;
module.exports.genre = genre;
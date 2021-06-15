const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
	Title: {type: String, require: true},
	Description: {type: String, require: true},
	Genre: [{type: mongoose.Schema.Type.ObjectId, ref: 'Genre'}]
	Director: [{type: mongoose.Schema.Type.ObjectId, ref: 'Director'}]
	Actors: [{type: mongoose.Schema.Type.ObjectId, ref: 'Genre'}]
	ImageUrl: String,
	Featured: Boolean
});

let userSchema = mongoose.Schema({
	Username: {type: String, require:true},
	Password: {type: String, require: true},
	Email: {type: String, require: true},
	Birthday: Date,
	favoriteMovies: [{type: mongoose.Schema.Type.ObjectId, ref: 'Movie'}]
});

let directorSchema = mongoose.Schema({
	Name: {type: String, require:true},
	Bio: {type: String, require:true},
	Birthday: Date,
	deathYear: Date
});

let genreSchema = mongoose.Schema({
	Name: {type: String, require: true},
	Description: String, require: true)
})

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);
let Director = mongoose.model('Director', directorSchema);
let Genre = mongoose.model('Genre' genreSchema);

module.export.Movie = Movie;
module.export.User= User;
module.export.Director = Director;
module.export.Genre = Genre;
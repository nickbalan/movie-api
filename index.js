const express = require('express');
	morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
	methodOverride = require('method-override');

// Adds an arry with the list of Top 10 Worldwide Box Office (2021)
let WorldwideBoxOffice = [
	{
		title:'Hi, Mom',
		director:'Jia Ling'
	},
	{
		title:'Detective Chinatown 3',
		director:'Chen Sicheng'
	},
	{
		title:'Godzilla vs. Kong',
		director:'Adam Wingard'
	},
	{
		title:'A Writers Odyssey',
		director:'Lu Yang'
	},
	{
		title:'Sister',
		director:'Ruoxin Yin'
	},
	{
		title:'Tom and Jerry',
		director:'William Hanna'
	},
	{
		title:'Raya and the Last Dragon',
		director:'Don Hall'
	},
	{
		title:'Endgame',
		director:'Anthony Russo'
	},
	{
		title:'Boonie Bears: The Wild Life',
		director:'Leon Ding'
	},
	{
		title:'Evangelion: 3.0+1.0 Thrice Upon a Time',
		director:'Hideaki Anno'
	}
];

// Adds a GET route located at the endpoint “/” that returns a default textual response
app.get('/', (req, res) => {
	res.send('Welcome to the movie-API');
});

//Implements Express.static to serve the “documentation.html” file
app.use(/'express.static('public'));

/* Implements an Express GET route located at the endpoint “/movies” that returns a JSON object containing data with Top 10 Worldwide Box Office (2021).*/
app.get('/movies', (req, res) => {
	res.json(WorldwideBoxOffice);
});

//Implements the Logs with Morgan in Express
app.use(morgan('common'));

//Implements Error Handling in Express
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Error!')
});

//Listens for requests on port 8080
app.listen(8080, () => {
	console.log('This app is listening on port 8080.');
});
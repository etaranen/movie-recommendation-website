import mysql from 'mysql';
import config from './config.js';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import response from 'express';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "client/build")));

const connection = mysql.createConnection(config);

connection.connect((err) => {
	if (err) {
	  console.error('Error connecting to the database:', err);
	  return;
	}
	console.log('Connected to the database');
  });

app.post('/api/loadUserSettings', (req, res) => {

	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
});


// Endpoint to get movies
app.post('/api/getMovies', (req, res) => {

	let sql = 'SELECT * FROM movies';

	connection.query(sql, (error, results) => {
	  if (error) {
		return console.error('Error fetching movies:', error);
	  }
	  res.send(results);
	});
  });

// Endpoint to add reviews
app.post('/api/addReview', (req, res) => {

	const { movieID, userID, reviewTitle, reviewContent, reviewScore } = req.body;
	
	let sql = `
		INSERT INTO Review (reviewTitle, reviewContent, reviewScore, userID, movieID)
		VALUES (?, ?, ?, ?, ?)
		`;
	
	let values = [reviewTitle, reviewContent, reviewScore, userID, movieID];

	connection.query(sql, values, (error, results) => {
		if (error) {
			return console.error('Error adding review:', error);
		}
		res.json('Success!');
	});
	// connection.end();
});




app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version

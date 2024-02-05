const express = require('express')
const app = express()
const port = 3001;

const config = {
	host: 'db',
	user: 'root',
	password: '123',
	database: 'nodedb',
}
const mysql = require('mysql2')
const connection = mysql.createConnection(config);

// connection.connect(function (err) {
// 	if (err) {
// 		throw err;
// 	}
// 	console.log("Connected!");
// });

const sql = `-- INSERT INTO people(name) values('Wesley')`
connection.query(sql);
connection.end();

app.get('/', (req, res) => {
	res.send('<h1> Full Cycle </h1>')
})

app.listen(port, () => {
	console.log(`rodando da porta: `, port);
})

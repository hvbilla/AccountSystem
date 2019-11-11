var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'mydb',
  insecureAuth : true
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected to db")
});

module.exports = connection;

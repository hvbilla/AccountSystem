//import the modules
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
var db = require('./db');

app.post('/register',function(req,res){
  let fname = req.body.firstName;
  let lname = req.body.lastName;
  let email = req.body.emailId;
  let password = req.body.password;

  let sql = "INSERT INTO `users` (fname, lname, email, password) VALUES ('" + fname + "', '" + lname + "', '" + email + "', '" + password + "')";
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});

app.post('/login',function(req,res){
  let email = req.body.email;
  let password = req.body.password;
  db.query("Select * from users where email = ?", email, function (err, result) {
    if (err) throw err;
    else {
      if (req.body.password === result[0].password) {
        res.json(result[0]);
      } else {
        res.send('password does not match')
      }
    }
  });
});

app.get('/getTransactionDetails',function(req,res){
  let email = req.body.email;
  let password = req.body.password;
  let userId= null;
  db.query("SELECT u.fname, a.accountId,a.AccountTypeId, t.TransactionId FROM\n" +
    " mydb.users u JOIN mydb.account a ON (u.userId = a.userId OR u.userId = a.spouseId) \n" +
    " JOIN mydb.transaction t on (t.AccountId= a.AccountId) \n" +
    " JOIN mydb.accounttype at ON at.AccountTypeId= a.AccountTypeId", function (err, result) {
    if (err) throw err;
    else {
      if (result) {
        console.log(result);
        res.json(result);
      } else {
        res.send('Error')
      }
    }
  });

});

app.listen(3000);



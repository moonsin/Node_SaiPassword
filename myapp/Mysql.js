var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'SaiPassword'
});

connection.connect();

var $sql = 'INSERT INTO user(user_name,password,email,submission_date) VALUES("sai","123","214",NOW())';

connection.query($sql, function(err, rows, fields) {
  if (err) throw err;
  console.log('insert successfully ', rows);
});

connection.end();

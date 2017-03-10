var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
//  主页输出 "Hello World"

//  POST 请求
app.post('/signup', function(req, res) {
    console.log(req.body.userId);
    console.log("主页 POST 请求");
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'SaiPassword'
    });

    connection.connect();
    console.log(req.body.email);
    var $sql = 'INSERT INTO user(user_name,password,email,submission_date) VALUES("'+req.body.userId+'","'+req.body.password+'","'+req.body.email+'",NOW())';
    console.log($sql);
    connection.query($sql, function(err, rows, fields) {
        if (err) throw err;
        console.log('insert successfully ', rows);
    });

    connection.end();
    res.send('Hello POST');
})
var server = app.listen(8080, function() {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})

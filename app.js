var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var dateBaseInfo = {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'SaiPassword'
    };
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
var mysql = require('mysql');

//  POST 请求
app.post('/signup', function(req, res) {
    function findUserId(userId) {
        let $sql = 'SELECT * FROM user WHERE user_name ="' + userId + '"';
        connection.query($sql, function(err, rows, fields) {
            if (err) throw err;
            var exist = !!rows.length;
            console.log(exist);
            if (!exist) {
                insertUser();
            } else {
                connection.end();
            }
            res.send({
                userExist: exist
            });
        });
    }
    function insertUser() {
        var $sql = 'INSERT INTO user(user_name,password,email,submission_date) VALUES("' + req.body.userId + '","' + req.body.password + '","' + req.body.email + '",NOW())';
        console.log($sql);
        connection.query($sql, function(err, rows, fields) {
            if (err) throw err;
            console.log('insert successfully ');
            connection.end();
        });

    }
    var connection = mysql.createConnection(dateBaseInfo);
    connection.connect();
    findUserId(req.body.userId);
})
var server = app.listen(8080, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})

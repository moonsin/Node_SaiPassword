var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var {
    dataBaseInfo
} = require('../common/dataBase');
var sqlApi = require('../common/sqlApi');
var mysql = require('mysql');
var async = require('async');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//  主页输出 "Hello World"
router.get('/', function(req, res) {
    console.log("主页 GET 请求");
    res.send('test router');
})

router.post('/signup', function(req, res) {
    var connection = mysql.createConnection(dataBaseInfo);
    var sqls = {
        'selectSQL': 'SELECT * FROM user WHERE user_name ="' + req.body.userId + '"',
        'insertSQL': 'INSERT INTO user(user_name,password,email,submission_date) VALUES("' + req.body.userId + '","' + req.body.password + '","' + req.body.email + '",NOW())',
    }

    connection.connect();
    async.waterfall([
        function(callback) {
            sqlApi.selectUset(connection, sqls.selectSQL, callback);
        },
        function(existState, callback) {
            if (!existState) {
                sqlApi.insertUser(connection, sqls.insertSQL, callback);
            } else {
                callback(null, true)
            }
        },
        function(existState, callback) {
            connection.end();
            res.send({
                userExist: existState
            });
            callback(null, 'done');
        }
    ], function(err, result) {
        // result now equals 'done'
        if (err) {
            console.log(err);
        } else {
            console.log('c:' + result)
        }
    });

})

router.post('/logout', function(req, res) {
    var connection = mysql.createConnection(dataBaseInfo);
    var sqls = {
        'updateSQL': 'UPDATE user SET data = \'' + req.body.data + '\' WHERE user_name =\'' + req.body.userId + '\'',
    }

    connection.connect();
    async.waterfall([
        function(callback) {
            sqlApi.updateUser(connection, sqls.updateSQL, callback);
        },
        function(existState, callback) {
            connection.end();
            res.send({
                logout: true
            });
            callback(null, 'done');
        }
    ], function(err, result) {
        // result now equals 'done'
        if (err) {
            console.log(err);
        } else {
            console.log('c:' + result)
        }
    });

})

router.post('/firstLogin', function(req, res) {
    var connection = mysql.createConnection(dataBaseInfo);
    var sqls = {
        'selectSQL': 'SELECT * FROM user WHERE user_name ="' + req.body.userId + '"',
    }
    connection.connect();
    async.waterfall([
        function(callback) {
            sqlApi.selectUserPassword(connection, sqls.selectSQL, callback);
        },
        function(row, callback) {
            connection.end();
            res.send({
                password: row.password
            });
            callback(null, 'done');
        }
    ], function(err, result) {
        // result now equals 'done'
        if (err) {
            console.log(err);
        } else {
            console.log('c:' + result)
        }
    });

})
router.post('/getData', function(req, res) {
    var connection = mysql.createConnection(dataBaseInfo);
    var sqls = {
        'selectSQL': 'SELECT * FROM user WHERE user_name ="' + req.body.userId + '" AND password = "' +req.body.password+'"',
    }
    connection.connect();
    async.waterfall([
        function(callback) {
            sqlApi.selectUserPassword(connection, sqls.selectSQL, callback);
        },
        function(row, callback) {
            connection.end();
            res.send({
                data: row.data
            });
            callback(null, 'done');
        }
    ], function(err, result) {
        // result now equals 'done'
        if (err) {
            console.log(err);
        } else {
            console.log('c:' + result)
        }
    });

})

module.exports = router;

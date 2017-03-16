var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var dataBase = require('../common/dataBase');
var sqlApi = require('../common/sqlApi');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



var ifUserIdExist = function (userId,connection) {
    let $sql = 'SELECT * FROM user WHERE user_name ="' + userId + '"';
    connection.query($sql, function(err, rows, fields) {
        if (err) throw err;
        var exist = !!rows.length;
        return exist;
    });
}

function insertUser(userId,password,email,connection) {
    var $sql = 'INSERT INTO user(user_name,password,email,submission_date) VALUES("' + userId + '","' + password + '","' + email + '",NOW())';
    console.log($sql);
    connection.query($sql, function(err, rows, fields) {
        if (err) throw err;
        console.log('insert successfully ');
    });

}

exports.ifUserIdExist = ifUserIdExist;
exports.insertUser = insertUser;

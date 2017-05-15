var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var dataBase = require('../common/dataBase');
var sqlApi = require('../common/sqlApi');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

var selectUset = function(connection, $sql, callback) {
    connection.query($sql, function(err, rows, fields) {
        if (err) throw err;
        callback(null, !!rows.length);
    });
}

function insertUser(connection, $sql, callback) {
    console.log($sql);
    connection.query($sql, function(err, rows, fields) {
        if (err) throw err;
        console.log('insert successfully ');
        callback(null, false);
    });

}

function updateUser(connection, $sql, callback) {
    console.log($sql);
    connection.query($sql, function(err, rows, fields) {
        if (err) throw err;
        console.log('update successfully ');
        callback(null, true);
    });
}
var selectUserPassword = function(connection, $sql, callback) {
    connection.query($sql, function(err, rows, fields) {
        if (err) throw err;
        console.log(rows[0]);
        if (rows[0]) {
            callback(null, rows[0]);
        } else {
            callback(null, false);
        }
    });
}

exports.selectUset = selectUset;
exports.insertUser = insertUser;
exports.updateUser = updateUser;
exports.selectUserPassword = selectUserPassword;

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var {dataBaseInfo} = require('../common/dataBase');
var sqlApi = require('../common/sqlApi');
var mysql = require('mysql');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//  主页输出 "Hello World"
router.get('/', function (req, res) {
   console.log("主页 GET 请求");
   res.send('test router');
})

router.post('/signup', function(req, res) {
   var connection = mysql.createConnection(dataBaseInfo);
   connection.connect();
   var userIdExist = sqlApi.ifUserIdExist(req.body.userId,connection);
   if(!userIdExist){
       sqlApi.insertUser(req.body.userId,req.body.password,req.body.email,connection); 
   }
   connection.end();
    res.send({
        userExist: userIdExist
    });


})

module.exports = router;

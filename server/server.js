var express = require('express');
var app = express();
var PORT = process.env.PORT || 4000;
var cors = require("cors");
var bodyParser = require('body-parser');
var sha256 = require('sha256');
var salt = "kanggobyungsin";
var mysql = require('mysql');
var db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'jsb0526',
    database: 'mydb' // db명
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post('/api/user/login', function (req, res) {
    var id = req.body.id;
    var password = sha256(req.body.password + salt);
    var sqlLoginCheck = "SELECT id password FROM user WHERE id = ? AND password = ?";
    db.query(sqlLoginCheck, [id, password], function (err, result) {
        console.log(result);
    });
});
app.post('/api/user/register', function (req, res) {
    var id = req.body.id;
    var password = sha256(req.body.password + salt);
    var name = req.body.name;
    var sex = req.body.sex;
    var school = req.body.school;
    var grade = req.body.grade;
    var option = req.body.option;
    var sqlRegister = "INSERT INTO user (`id`, `password`, `name`, `sex`, `school`, `grade`, `option`) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sqlRegister, [id, password, name, sex, school, grade, option], function (err, result) {
        console.log(result);
    });
});
app.listen(PORT, function () {
    console.log("Server On : http://localhost:" + PORT + "/");
});

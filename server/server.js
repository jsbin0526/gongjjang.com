var express = require('express');
var app = express();
var PORT = 4000;
var cors = require("cors");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var sha256 = require('sha256');
var jwt = require('jsonwebtoken');
require('dotenv').config();
var salt = process.env.SALT;
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
app.use(cookieParser());
app.post('/api/user/login', function (req, res) {
    var email = req.body.email;
    var password = sha256(req.body.password + salt);
    var sqlLoginCheck = "SELECT `email` `password` FROM `user` WHERE `email` = ? AND `password` = ?";
    db.query(sqlLoginCheck, [email, password], function (err, result) {
        if (Object.keys(result).length === 1) {
            if (err)
                return res.json({ loginSuccess: false, err: err });
            var token = jwt.sign(email, "" + process.env.JWT_SECRET);
            return res.cookie("x_auth", token).status(200).json({ loginSuccess: true, userId: email });
        }
        else {
            return res.status(200).json({
                loginSuccess: false
            });
        }
    });
});
app.post('/api/user/register', function (req, res) {
    var email = req.body.email;
    var password = sha256(req.body.password + salt);
    var name = req.body.name;
    var sex = req.body.sex;
    var school = req.body.school;
    var grade = req.body.grade;
    var option = req.body.option;
    var sqlRegister = "INSERT INTO `user` (`email`, `password`, `name`, `sex`, `school`, `grade`, `option`) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sqlRegister, [email, password, name, sex, school, grade, option], function (err, result) {
        if (err)
            return res.json({ registerSuccess: false, err: err });
        return res.status(200).json({
            registerSuccess: true
        });
    });
});
app.post('/api/user/overlapCheckEmail', function (req, res) {
    var email = req.body.email;
    var sqlOverlapCheck = "SELECT `email` FROM `user` WHERE `email` = ?";
    db.query(sqlOverlapCheck, email, function (err, result) {
        if (Object.keys(result).length === 0) {
            if (err)
                return res.json({ overlapCheckEmail: false, err: err });
            return res.status(200).json({
                overlapCheckEmail: true
            });
        }
        else {
            return res.status(200).json({
                overlapCheckEmail: false
            });
        }
    });
});
app.listen(PORT, function () {
    console.log("Server On : http://localhost:" + PORT + "/");
});

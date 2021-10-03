/* eslint-disable */

"use strict";
exports.__esModule = true;
var express = require('express');
var app = express();
var PORT = 4000;
var cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var sha256 = require('sha256');
var jwt = require('jsonwebtoken');
var path = require('path');
var auth = function (req, res, next) {
    var token = req.cookies.x_auth;
    var sqlTokenCheck = 'SELECT `email` `token` FROM `user` WHERE `email` = ? AND `token` = ?';
    var sqlGetUserData = 'SELECT * FROM `user` WHERE `email` = ?';
    jwt.verify(token, '' + process.env.JWT_SECRET, function (_err, decode) {
        db.query(sqlTokenCheck, [decode !== undefined ? decode.email : 'null', token], function (err, result) {
            if (err)
                throw err;
            if (result.length === 0)
                return res.json({ isAuth: false, error: true });
            db.query(sqlGetUserData, decode !== undefined ? decode.email : 'null', function (err2, result2) {
                req.user = JSON.parse(JSON.stringify(result2[0]));
                next();
            });
        });
    });
};
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
var salt = process.env.SALT;
var mysql = require('mysql');
var db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    dateStrings: 'date'
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.post('/api/user/login', function (req, res) {
    var email = req.body.email;
    var password = sha256(req.body.password + salt);
    var token = jwt.sign({ email: email }, '' + process.env.JWT_SECRET);
    var sqlLoginCheck = 'SELECT `email` `password` FROM `user` WHERE `email` = ? AND `password` = ?';
    var sqlInsertToken = 'UPDATE `user` SET `token` = ? WHERE `email` = ?';
    db.query(sqlLoginCheck, [email, password], function (err, result) {
        if (Object.keys(result).length === 1) {
            if (err)
                return res.json({ loginSuccess: false, err: err });
            db.query(sqlInsertToken, [token, email], function (err2, result2) {
                if (err2)
                    return res.json({ insertTokenSucces: false, err2: err2 });
                return res.cookie('x_auth', token, { httpOnly: true }).status(200).json({ loginSuccess: true, email: email });
            });
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
    var sqlRegister = 'INSERT INTO `user` (`email`, `password`, `token`, `name`, `sex`, `school`, `grade`, `option`) VALUES (?, ?, "", ?, ?, ?, ?, ?)';
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
    var sqlOverlapCheck = 'SELECT `email` FROM `user` WHERE `email` = ?';
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
app.get('/api/user/auth', auth, function (req, res) {
    res.status(200).json({
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        sex: req.user.sex,
        school: req.user.school,
        grade: req.user.grade,
        option: req.user.option
    });
});
app.get('/api/user/logout', auth, function (req, res) {
    var email = req.user.email;
    var sqlLogout = 'UPDATE `user` SET `token` = "" WHERE email = ?';
    db.query(sqlLogout, email, function (err, result) {
        if (err)
            return res.json({ logoutSuccess: false, err: err });
        return res.status(200).json({
            logoutSuccess: true
        });
    });
});
app.post('/api/user/passwordChange', function (req, res) {
    var email = req.body.email;
    var password = sha256(req.body.password + salt);
    var sqlPasswordChange = 'UPDATE `user` SET `password` = ? WHERE `email` = ?';
    db.query(sqlPasswordChange, [password, email], function (err, result) {
        if (err)
            return res.json({ passwordChangeSuccess: false, err: err });
        return res.status(200).json({
            passwordChangeSuccess: true
        });
    });
});
app.get('/api/diary/fetch', auth, function (req, res) {
    var email = req.user.email;
    var sqlFetchDiary = 'SELECT * FROM `diary` WHERE `author` = ?';
    db.query(sqlFetchDiary, email, function (err, result) {
        if (err)
            return res.json({ fetchResults: null, err: err });
        return res.status(200).json({
            fetchResults: result.map(function (x) { return JSON.parse(JSON.stringify(x)); })
        });
    });
});
app.post('/api/diary/write', function (req, res) {
    var title = req.body.title;
    var body = req.body.body;
    var author = req.body.author;
    var date = req.body.date;
    var sqlWriteDiary = 'INSERT INTO `diary` (`title`, `body`, `author`, `date`) VALUES (?, ?, ?, ?)';
    db.query(sqlWriteDiary, [title, body, author, date], function (err, result) {
        if (err)
            return res.json({ writeSuccess: false, err: err });
        return res.status(200).json({
            writeSuccess: true
        });
    });
});
app.post('/api/diary/delete', function (req, res) {
    var id = req.body.id;
    var sqlDeleteDiary = 'DELETE FROM `diary` WHERE `id` = ?';
    db.query(sqlDeleteDiary, id, function (err, result) {
        if (err)
            return res.json({ deleteSuccess: false, err: err });
        return res.status(200).json({
            deleteSuccess: true
        });
    });
});
app.listen(PORT, function () {
    console.log("Server On : http://localhost:" + PORT + "/");
});

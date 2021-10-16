var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var sha256 = require('sha256');
var jwt = require('jsonwebtoken');
var path = require('path');
var PORT = process.env.PORT || 4000;
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
var corsOptions = {
    origin: 'https://jsbin0526.github.io',
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    maxAge: 86400,
    optionSuccessStatus: 200
};
var mysql = require('mysql');
var db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    dateStrings: 'date'
});
app.use(cors(corsOptions));
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
    var queryLoginCheck = function (callback) {
        db.query(sqlLoginCheck, [email, password], function (err, result) {
            if (err)
                callback(err, false);
            else
                callback(null, Object.keys(result).length);
        });
    };
    var queryInsertToken = function (callback) {
        db.query(sqlInsertToken, [token, email], function (err, result) {
            if (err)
                callback(err);
            else
                callback(null);
        });
    };
    queryLoginCheck(function (err, result) {
        if (result === 1) {
            if (err)
                return res.json({ loginSuccess: false, err: err });
            queryInsertToken(function (err) {
                if (err)
                    return res.json({ insertTokenSucces: false, err: err });
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
    var queryRegister = function (callback) {
        db.query(sqlRegister, [email, password, name, sex, school, grade, option], function (err) {
            if (err)
                callback(err);
            else
                callback(null);
        });
    };
    queryRegister(function (err) {
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
    var queryOverlapCheck = function (callback) {
        db.query(sqlOverlapCheck, email, function (err, result) {
            if (err)
                callback(err, null);
            else
                callback(null, Object.keys(result).length);
        });
    };
    queryOverlapCheck(function (err, result) {
        if (err)
            return res.json({ overlapCheckEmail: false, err: err });
        if (result !== 0)
            return res.status(200).json({ overlapCheckEmail: false });
        return res.status(200).json({
            overlapCheckEmail: true
        });
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
app.post('/api/article/fetch', function (req, res) {
    var query = req.body.query;
    var sqlQueryArticle = query !== '' ? 'SELECT * FROM `article` WHERE MATCH (title, body) AGAINST (? IN NATURAL LANGUAGE MODE)' : 'SELECT * FROM `article`';
    db.query(sqlQueryArticle, query, function (err, result) {
        if (err)
            return res.json({ fetchResults: null, err: err });
        return res.status(200).json({
            fetchResults: result.map(function (x) { return JSON.parse(JSON.stringify(x)); })
        });
    });
});
app.post('/api/article/write', auth, function (req, res) {
    var title = req.body.title;
    var body = req.body.body;
    var author = req.user.email;
    var name = req.user.name;
    var date = req.body.date;
    var sqlWriteArticle = 'INSERT INTO `article` (`title`, `body`, `author`, `name`, `date`, `likes`, `views`) VALUES (?, ?, ?, ?, ?, 0, 0)';
    db.query(sqlWriteArticle, [title, body, author, name, date], function (err, result) {
        if (err)
            return res.json({ writeSuccess: false, err: err });
        return res.status(200).json({
            writeSuccess: true
        });
    });
});
app.post('/api/article/view', function (req, res) {
    var id = req.body.id;
    var sqlViewArticle = 'SELECT * FROM `article` WHERE `id` = ?';
    var sqlIncreaseViews = 'UPDATE `article` SET views = views + 1 WHERE `id` = ?';
    db.query(sqlViewArticle, id, function (err, result) {
        if (err)
            return res.json({ ViewResults: null, err: err });
        db.query(sqlIncreaseViews, id, function (err2, result2) {
            return res.status(200).json({
                viewResults: JSON.parse(JSON.stringify(result[0]))
            });
        });
    });
});
app.listen(PORT, function () {
    console.log("Server On : http://localhost:" + PORT + "/");
});

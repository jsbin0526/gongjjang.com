const express = require('express');
const app = express();
const PORT = 4000;
const cors = require("cors");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sha256 = require('sha256');
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const token = req.cookies.x_auth;
    const sqlTokenCheck = "SELECT `email` `token` FROM `user` WHERE `email` = ? AND `token` = ?";
    const sqlGetUserData = "SELECT * FROM `user` WHERE `email` = ?"
    jwt.verify(token, ""+process.env.JWT_SECRET, function(err, decode) {
        db.query(sqlTokenCheck, [decode !== undefined ? decode.email : 'null', token], (err, result) => {
            if (err) throw err;
            if (result.length === 0) return res.json({ isAuth: false, error: true});
            db.query(sqlGetUserData, decode !== undefined ? decode.email : 'null', (err2, result2) => {
                req.user = JSON.parse(JSON.stringify(result2[0]));
                next();
            });
        });
    });
};

require('dotenv').config()

const salt = process.env.SALT;

const mysql = require('mysql');
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'jsb0526',  //패스워드
    database: 'mydb'         // db명
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.post('/api/user/login', (req, res) => {
    const email = req.body.email;
    const password = sha256(req.body.password + salt);
    const sqlLoginCheck = "SELECT `email` `password` FROM `user` WHERE `email` = ? AND `password` = ?";
    db.query(sqlLoginCheck, [email, password], (err, result) => {
        if (Object.keys(result).length === 1) {
            if (err) return res.json({ loginSuccess: false, err })
            const token = jwt.sign({email: email}, ""+process.env.JWT_SECRET, {noTimestamp: true});
            return res.cookie("x_auth", token, {httpOnly: true}).status(200).json({loginSuccess: true, userId: email}) 
        } else {
            return res.status(200).json({
                loginSuccess: false,
            })
        }
    })
});


app.post('/api/user/register', (req: {body : {
    email: string;
    password: string;
    name: string;
    sex: string;
    school: string;
    grade: string;
    option: string;
}}, res) => {
    const email = req.body.email;
    const password = sha256(req.body.password + salt);
    const token = jwt.sign({email: email}, ""+process.env.JWT_SECRET, {noTimestamp: true});
    const name = req.body.name;
    const sex = req.body.sex;
    const school = req.body.school;
    const grade = req.body.grade;
    const option = req.body.option;

    const sqlRegister = "INSERT INTO `user` (`email`, `password`, `token`, `name`, `sex`, `school`, `grade`, `option`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sqlRegister, [email, password, token, name, sex, school, grade, option], (err, result) => {
        if (err) return res.json({ registerSuccess: false, err })
        return res.status(200).json({
            registerSuccess: true
        })
    });
});
app.post('/api/user/overlapCheckEmail', (req, res) => {
    const email = req.body.email;
    const sqlOverlapCheck = "SELECT `email` FROM `user` WHERE `email` = ?";
    db.query(sqlOverlapCheck, email, (err, result) => {
        if (Object.keys(result).length === 0) {
            if (err) return res.json({ overlapCheckEmail: false, err })
            return res.status(200).json({
                overlapCheckEmail: true
            })
        } else {
            return res.status(200).json({
                overlapCheckEmail: false
            })
        }
    })
})

app.get('/api/user/auth', auth, (req, res) => {
    res.status(200).json({
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        sex: req.user.sex,
        school: req.user.school,
        grade: req.user.grade,
        option: req.user.option,
    })
})

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
});
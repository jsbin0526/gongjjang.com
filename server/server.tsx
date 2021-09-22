const express = require('express');
const app = express();
const PORT = 4000;
const cors = require("cors");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sha256 = require('sha256');
const jwt = require('jsonwebtoken')

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
            var token = jwt.sign(email, ""+process.env.JWT_SECRET);
            return res.cookie("x_auth", token).status(200).json({loginSuccess: true, userId: email}) 
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
    const name = req.body.name;
    const sex = req.body.sex;
    const school = req.body.school;
    const grade = req.body.grade;
    const option = req.body.option;

    const sqlRegister = "INSERT INTO `user` (`email`, `password`, `name`, `sex`, `school`, `grade`, `option`) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sqlRegister, [email, password, name, sex, school, grade, option], (err, result) => {
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


app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
});
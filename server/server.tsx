const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const bodyParser = require('body-parser');
const sha256 = require('sha256');

const salt = "kanggobyungsin";

const mysql = require('mysql');
const db = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'jsb0526',  //패스워드
    database : 'mydb'         // db명
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.post('/api/user/login', (req, res) => {
    const id = req.body.id;
    const password = sha256(req.body.password+salt);
    const sqlLoginCheck = "SELECT id password FROM user WHERE id = ? AND password = ?";
    db.query(sqlLoginCheck, [id, password], (err, result) => {
        console.log(result);
    })
});


app.post('/api/user/register', (req, res) => {
    const id = req.body.id;
    const password = sha256(req.body.password+salt);
    const name = req.body.name;
    const sex = req.body.sex;
    const school = req.body.school;
    const grade = req.body.grade;
    const option = req.body.option;

    const sqlRegister = "INSERT INTO user (`id`, `password`, `name`, `sex`, `school`, `grade`, `option`) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sqlRegister, [id, password, name, sex, school, grade, option], (err, result) => {
        console.log(result);
    });
});
app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
});
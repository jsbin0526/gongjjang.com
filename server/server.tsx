const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const sha256 = require('sha256')
const jwt = require('jsonwebtoken')
const path = require('path')

const PORT = process.env.PORT || 4000

const auth = (req, res, next) => {
  const token = req.cookies.x_auth
  const sqlTokenCheck = 'SELECT `email` `token` FROM `user` WHERE `email` = ? AND `token` = ?'
  const sqlGetUserData = 'SELECT * FROM `user` WHERE `email` = ?'
  jwt.verify(token, '' + process.env.JWT_SECRET, function (_err, decode) {
    db.query(sqlTokenCheck, [decode !== undefined ? decode.email : 'null', token], (err, result) => {
      if (err) throw err
      if (result.length === 0) return res.json({ isAuth: false, error: true })
      db.query(sqlGetUserData, decode !== undefined ? decode.email : 'null', (err2, result2) => {
        req.user = JSON.parse(JSON.stringify(result2[0]))
        next()
      })
    })
  })
}

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const salt = process.env.SALT
const corsOptions = {
  origin: 'https://jsbin0526.github.io',
  credentials: true,
  optionSuccessStatus: 200
}

const mysql = require('mysql')
const db = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  dateStrings: 'date'
})

app.use(cors(corsOptions))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

app.post('/api/user/login', (req, res) => {
  const email = req.body.email
  const password = sha256(req.body.password + salt)
  const token = jwt.sign({ email: email }, '' + process.env.JWT_SECRET)
  const sqlLoginCheck = 'SELECT `email` `password` FROM `user` WHERE `email` = ? AND `password` = ?'
  const sqlInsertToken = 'UPDATE `user` SET `token` = ? WHERE `email` = ?'
  db.query(sqlLoginCheck, [email, password], (err, result) => {
    if (Object.keys(result).length === 1) {
      if (err) return res.json({ loginSuccess: false, err })
      db.query(sqlInsertToken, [token, email], (err2, result2) => {
        if (err2) return res.json({ insertTokenSucces: false, err2 })
        return res.cookie('x_auth', token, { httpOnly: true }).status(200).json({ loginSuccess: true, email: email })
      })
    } else {
      return res.status(200).json({
        loginSuccess: false
      })
    }
  })
})

app.post('/api/user/register', (req: {body : {
    email: string;
    password: string;
    name: string;
    sex: string;
    school: string;
    grade: string;
    option: string;
}}, res) => {
  const email = req.body.email
  const password = sha256(req.body.password + salt)
  const name = req.body.name
  const sex = req.body.sex
  const school = req.body.school
  const grade = req.body.grade
  const option = req.body.option

  const sqlRegister = 'INSERT INTO `user` (`email`, `password`, `token`, `name`, `sex`, `school`, `grade`, `option`) VALUES (?, ?, "", ?, ?, ?, ?, ?)'
  db.query(sqlRegister, [email, password, name, sex, school, grade, option], (err, result) => {
    if (err) return res.json({ registerSuccess: false, err })
    return res.status(200).json({
      registerSuccess: true
    })
  })
})
app.post('/api/user/overlapCheckEmail', (req, res) => {
  const email = req.body.email
  const sqlOverlapCheck = 'SELECT `email` FROM `user` WHERE `email` = ?'
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
    option: req.user.option
  })
})

app.get('/api/user/logout', auth, (req, res) => {
  const email = req.user.email
  const sqlLogout = 'UPDATE `user` SET `token` = "" WHERE email = ?'
  db.query(sqlLogout, email, (err, result) => {
    if (err) return res.json({ logoutSuccess: false, err })
    return res.status(200).json({
      logoutSuccess: true
    })
  })
})

app.post('/api/user/passwordChange', (req, res) => {
  const email = req.body.email
  const password = sha256(req.body.password + salt)
  const sqlPasswordChange = 'UPDATE `user` SET `password` = ? WHERE `email` = ?'
  db.query(sqlPasswordChange, [password, email], (err, result) => {
    if (err) return res.json({ passwordChangeSuccess: false, err })
    return res.status(200).json({
      passwordChangeSuccess: true
    })
  })
})

app.get('/api/diary/fetch', auth, (req, res) => {
  const email = req.user.email
  const sqlFetchDiary = 'SELECT * FROM `diary` WHERE `author` = ?'
  db.query(sqlFetchDiary, email, (err, result) => {
    if (err) return res.json({ fetchResults: null, err })
    return res.status(200).json({
      fetchResults: result.map(x => JSON.parse(JSON.stringify(x)))
    })
  })
})

app.post('/api/diary/write', (req, res) => {
  const title = req.body.title
  const body = req.body.body
  const author = req.body.author
  const date = req.body.date
  const sqlWriteDiary = 'INSERT INTO `diary` (`title`, `body`, `author`, `date`) VALUES (?, ?, ?, ?)'
  db.query(sqlWriteDiary, [title, body, author, date], (err, result) => {
    if (err) return res.json({ writeSuccess: false, err })
    return res.status(200).json({
      writeSuccess: true
    })
  })
})

app.post('/api/diary/delete', (req, res) => {
  const id = req.body.id
  const sqlDeleteDiary = 'DELETE FROM `diary` WHERE `id` = ?'
  db.query(sqlDeleteDiary, id, (err, result) => {
    if (err) return res.json({ deleteSuccess: false, err })
    return res.status(200).json({
      deleteSuccess: true
    })
  })
})

app.post('/api/article/fetch', (req, res) => {
  const query = req.body.query
  const sqlQueryArticle = query !== '' ? 'SELECT * FROM `article` WHERE MATCH (title, body) AGAINST (? IN NATURAL LANGUAGE MODE)' : 'SELECT * FROM `article`'
  db.query(sqlQueryArticle, query, (err, result) => {
    if (err) return res.json({ fetchResults: null, err })
    return res.status(200).json({
      fetchResults: result.map((x) => JSON.parse(JSON.stringify(x)))
    })
  })
})

app.post('/api/article/write', auth, (req, res) => {
  const title = req.body.title
  const body = req.body.body
  const author = req.user.email
  const name = req.user.name
  const date = req.body.date
  const sqlWriteArticle = 'INSERT INTO `article` (`title`, `body`, `author`, `name`, `date`, `likes`, `views`) VALUES (?, ?, ?, ?, ?, 0, 0)'
  db.query(sqlWriteArticle, [title, body, author, name, date], (err, result) => {
    if (err) return res.json({ writeSuccess: false, err })
    return res.status(200).json({
      writeSuccess: true
    })
  })
})

app.post('/api/article/view', (req, res) => {
  const id = req.body.id
  const sqlViewArticle = 'SELECT * FROM `article` WHERE `id` = ?'
  const sqlIncreaseViews = 'UPDATE `article` SET views = views + 1 WHERE `id` = ?'
  db.query(sqlViewArticle, id, (err, result) => {
    if (err) return res.json({ ViewResults: null, err })
    db.query(sqlIncreaseViews, id, (err2, result2) => {
      return res.status(200).json({
        viewResults: JSON.parse(JSON.stringify(result[0]))
      })
    })
  })
})

app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`)
})

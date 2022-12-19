const express = require('express')
const session = require("express-session");
const bp = require('body-parser')
const app = express()
const port = 8080
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite');
var crypto = require('crypto');
const https = require("https"), fs = require("fs");
const cors = require('cors');
app.use(cors());

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(express.json({ limit: '1mb' }))
app.use(
  session({
      resave: false,
      saveUninitialized: true,
      secret: "anyrandomstring",
    })
  );

const options = {
  key: fs.readFileSync("./server.key"),
  cert: fs.readFileSync("./server.cert")
};

db.serialize(function () {
  console.log('creating databases if they don\'t exist');
  db.run('create table if not exists users (userId integer primary key, username text not null, password text not null)');
});

const addUserToDatabase = (username, password) => {
  db.run(
    'insert into users (username, password) values (?, ?)',
    [username, password],
    function (err) {
      if (err) {
        console.error(err);
      }
    }
  );
}

const getUserByUsername = (userName) => {
  return new Promise((resolve, reject) => {
    db.all(
      'select * from users where userName=(?)',
      [userName],
      (err, rows) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        return resolve(rows);
      }
    );
  })
}

const hashPassword = (password) => {
  const md5sum = crypto.createHash('md5');
  const salt = 'salt goes here';
  return md5sum.update(password + salt).digest('hex');
}


app.post('/logout', async (req, res) => {
  console.log('/logout called')
  req.session.destroy((err) => {});
  return res.send("Thank you! Visit again");

})

app.post('/register', async (req, res) => {
  const user = await getUserByUsername(req.body.username);
  const password = req.body.password;
  console.log('/register called')
  console.log(req.body)
  if (req.body.username == null) {
    res.status(400).send('Invalid username')
    return
  }
  if (user.length > 0) {
    res.status(400).send('Username already exists');
    return
  }
  if (password.length === 0) {
    res.status(400).send('Password cannot be empty');
    return
  }
  addUserToDatabase(req.body.username, hashPassword(req.body.password))
  console.log('user registered successfully')
  req.session.loggedIn = true;
  req.session.username = user;
  res.status(200).send('OK')
})

app.post('/signin', async (req, res) => {
  const user = await getUserByUsername(req.body.username);
  console.log('/signin called')
  console.log(req.body)
  if (req.body.username == null) {
    res.status(400).send('Wrong username')
    return
  }
  if (user.length == 0) {
    res.status(400).send('Username does not exist');
    return
  }
  if (user[0].password != hashPassword(req.body.password)) {
    res.status(400).send('Wrong password');
    return
  }
  console.log('user logged in successfully')
  req.session.loggedIn = true;
  req.session.username = user;
  res.status(200).send('OK')
})

app.use((req, res) => {
  res.writeHead(200);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

https.createServer(options, app).listen(8443);
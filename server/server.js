const express = require('express')
const bp = require('body-parser')
const app = express()
const port = 8080
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite');
var crypto = require('crypto');

const cors = require('cors');    
app.use(cors());

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(express.json({limit:'1mb'}))

db.serialize(function() {
    console.log('creating databases if they don\'t exist');
    db.run('create table if not exists users (userId integer primary key, username text not null, password text not null)');
  });

  const addUserToDatabase = (username, password) => {
    db.run(
      'insert into users (username, password) values (?, ?)', 
      [username, password], 
      function(err) {
        if (err) {
          console.error(err);
        }
      }
    );
  }

  const getUserByUsername = (userName) => {
    // Smart måde at konvertere fra callback til promise:
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



app.post('/register', async (req, res) => {
  const user = await getUserByUsername(req.body.username);
  console.log('/register called' )
	console.log(req.body)
  if (req.body.username == null) {
    res.status(400).send('Wrong username')
    return
  }    
    if (user.length > 0) {
    res.status(400).send('Username already exists');
    return
  }
    addUserToDatabase(req.body.username, hashPassword(req.body.password))
	res.status(200).send('OK')
})


app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
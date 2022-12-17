const express = require('express')
const bp = require('body-parser')
const app = express()
const port = 8080
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite');

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

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



app.post('/register', (req, res) => {
  console.log('/register called' )
	console.log(req)
    addUserToDatabase(req.body.username, req.body.password)
	res.status(200).send('OK')
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
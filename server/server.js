const express = require('express')
const app = express()
var sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db.sqlite');



app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree", "userFour"] })
})

app.post("/api", (req, res) => {
    res.json({})
})

app.listen(8080, () => { console.log("Server started on port 8080")})
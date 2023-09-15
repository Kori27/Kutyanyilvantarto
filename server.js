const express = require('express')
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose()
const app = express()
const port = 3000
var x = 0
app.use(cors())
app.use(express.json())

let db = new sqlite3.Database('cica.db')

app.get('/', (req, res) => {
  db.all('select * from kutya', [], (err, rows) => {
    res.send(`<a href='http://localhost:5173/'>Itt a kliens</a><br>${rows.map(v => v.nev).join("<br>")}`)
  })
})

app.get('/getall', (req, res) => {
  db.all('SELECT * FROM kutya ORDER BY nev', [], (err, rows) => {
    res.send({kutyak: rows})
  })
})

app.post('/', (req, res) => {
  db.run(`INSERT INTO kutya (nev) VALUES('${req.body.kutya}')`, [], (err, rows) => {
    res.send({ ok: true })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
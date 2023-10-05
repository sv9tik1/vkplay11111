const express = require("express");
const sqlite3 = require("sqlite3");
const bodyParser = require ("body-parser");
const db = new sqlite3.Database(/steam.db)


var app = express();
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.listen(8000, () => {
    console.log("Server is listening on port" + 8000);
});

app.get('/', (req, res) =>{
    res.json('Молодец!')
})

app.get('/games', (req, res) => {
    db.all(`SELECT * FROM GAMES  WHERE price > $price`, {$price: 0}, (err, rows) => {
        res.json(rows)
    })

})

app.get('/creators', (req, res) => {
    db.all(`SELECT * FROM CREATORS`, (err, rows) => {
        res.json(rows)
    })

})

app.get('/category', (req, res) => {
    db.all(`SELECT * FROM CATEGORY`, (err, rows) => {
        res.json(rows)
    })

})

app.get('/genre', (req, res) => {
    db.all(`SELECT * FROM GENRE`, (err, rows) => {
        res.json(rows)
    })

})

app.get('/game_type', (req, res) => {
    db.all(`SELECT * FROM GAME_TYPE`, (err, rows) => {
        res.json(rows)
    })

})

app.get('/game_genres', (req, res) => {
    db.all(`SELECT * FROM GAME_GENRE`, (err, rows) => {
        res.json(rows)
    })

})


app.get('/games/price/:price', (req, res) => {
    const price = req.params.price
    db.all(`SELECT * FROM GAMES WHERE price > $price`, {$price: price}, (err, rows) => {
        res.json(rows)
    })
})

app.post('/games', (req, res)=> {
    const data = req.body
    const request = `INSERT INTO GAMES VALUES(
        null, 
         ${data.name},
         ${data.price},
         ${data.requirements},
         ${data.release_date},
         ${data.desc},
         ${data.tye_id},
         ${data.category_id},
         ${data.creator})`
        
         console.log(request)
        db.run(request, (err) => {
            if (err) {
                res.json(err)
            }
            res.json('Запсись добавлена')
        })
     })

app.delete('/games', (req, res)=> {
    const data = req.body
    console.log(data)
    db.run(`DELETE FROM GAMES WHERE ID = $(data.id)`, (err)=> {
        if (err) {
            res.json(err)
        }
        res.json('Удаление прошло успешно')
    })
})

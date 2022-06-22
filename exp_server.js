const express = require("express")
const cors = require("cors")
const { Pool } = require("pg");
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "gamelobby",
    password: "secret",
    port: 5432
});


module.exports = {
    query: (text, params) => pool.query(text,params),
};

const app = express()
app.use(cors())
app.use(express.json())

app.get('/getPlayers', async (req, res) => {
    try {
        const playersRes = await pool.query("select * from users")
        res.json(playersRes.rows)

    } 
    catch (err) {
        console.log(err)
    }
})

app.get('/getColors', async (req, res) => {
    try {
        const colorsRes = await pool.query("select * from colors")
        res.json(colorsRes.rows)

    } 
    catch (err) {
        console.log(err)
    }
})

app.get('/checkPassword/:id', async (req, res) => {
    try {
        const auth = await pool.query("select password from users where email = $1", 
        [req.params.id])
        res.json(auth.rows[0])

    } 
    catch (err) {
        console.log(err)
    }
})

app.put('/setLogin', async (req, res) => {
    try {
        const loggedIn = await pool.query("update users set loggedin = $1 where email = $2 returning *", 
        [ req.body.state, req.body.field ])
        res.json(loggedIn.rows[0])
    }
    catch (err) {
        console.log(err)
    }
})

app.put('/setPlayerColor', async (req, res) => {
    try {
        const userColor = await pool.query("update users set color = $2 where id = $1 returning *", 
        [ req.body.id, req.body.newColor ])
        res.json(userColor.rows[0])
    }
    catch (err) {
        console.log(err)
    }
})

app.put('/setColorSelect/', async (req, res) => {
    try {
        const updateCurrColor = await pool.query("update colors set selected = true where code = $1 returning *", 
        [ req.body.curr ])
        const updatePrevColor = await pool.query("update colors set selected = false where code = $1 returning *", 
        [ req.body.prev ])
        res.json({
            updateCurrColor, 
            updatePrevColor
        })
    }
    catch (err) {
        console.log(err)
    }
})


app.listen(3005, () => {
    console.log("Postgres DB Server running on port 3005.")
})
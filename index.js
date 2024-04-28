
import dotenv from 'dotenv';
import express from 'express';
import pg from 'pg';
;const { Pool } = pg;



dotenv.config();
const app = express();
app.use(express.static('public'));

const pool = new Pool({
    user: 'fox',
    host: 'localhost',
    database: 'discordbot',
    password: '',
    port: 5432, // Default PostgreSQL port
  });
  
app.get('/', (req,res) => {
    res.render("index.ejs")
});

app.get('/test',(req, res) => {
    res.render("test.ejs")
});

app.listen(process.env.PORT);
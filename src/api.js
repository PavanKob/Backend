const express = require('express');
const serverless = require('serverless-http');
const mysql = require('mysql');
const cors = require('cors');
const router = express.Router();

const app = express()
app.use(cors())

const db = mysql.createConnection({
    host:'sql12.freesqldatabase.com',
    user:'sql12619557',
    password:'bUTKs4fjLk',
    database:'sql12619557'
});

router.get('/',(re, res)=>{
    return res.json("From Backend side");
});

router.get('/employees',(req, res)=>{
    const sql = "select * from Employee";
    db.query(sql,(err, data)=>{
        if(err) return res.json(err);
        else return res.json(data);
    })
});


app.listen(8081, () =>{
    console.log("listening");
})
app.use('/.netlify/functions/api',router);
module.exports=app;
module.exports.handler = serverless(app);
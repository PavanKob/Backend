const express = require('express');
const serverless = require('serverless-http');
const mysql = require('mysql');
const cors = require('cors');
const router = express.Router();

const app = express()
app.use(cors())

const mysql_pool  = mysql.createPool({
    connectionLimit : 100,
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
    mysql_pool.getConnection(function(err, connection) {
		if (err) {
			connection.release();
	  		console.log(' Error getting mysql_pool connection: ' + err);
	  		throw err;
	  	}
          connection.query(sql,(err, data)=>{
            if(err) return res.json(err);
            else return res.json(data);
        })
})});


app.listen(8081, () =>{
    console.log("listening");
})
app.use('/.netlify/functions/api',router);
module.exports=app;
module.exports.handler = serverless(app);
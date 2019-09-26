const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    // host:"34.253.248.15",
    // user: "d4hkbuil_d4userk",
    // password:"qrEQI$IQvt}1",
    // database:"d4hkbuil_d4hk"
    host: "remotemysql.com",
    user: "7D5oLoh1Ft",
    password: "zR1K1CNQkG",
    database:"7D5oLoh1Ft"
});

db.connect();

app.get('/', function(req, res) {
    var sql = 'SELECT * FROM emails';
    db.query(sql, (err, result)=>{
    if(err) throw err;
    console.log(result);
    res.send(result);
    });
});

// app.get('/data', function(req,res){

// });

app.post('/', function(req, res){
    var area = req.body.area;
    console.log("AREAS " + req.body.area);
    var query = `SELECT email,name FROM emails WHERE area="${area}"`;

    db.query(query, function(err, result)
    {
        if (err)
        {
            throw err;
        }
        else 
        {
            if (result.length>0)
            {
                res.send(result);
            }
        }
    });

});

app.listen(process.env.PORT || 3210, ()=>{
    console.log('Server connected to port 3210')
});
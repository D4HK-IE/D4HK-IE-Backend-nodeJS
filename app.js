const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const db = {
    host: "remotemysql.com",
    user: "7D5oLoh1Ft",
    password: "zR1K1CNQkG",
    database:"7D5oLoh1Ft",
};

function disconnect_handler() {
    let conn = mysql.createConnection(db);
    conn.connect(err => {
        (err) && setTimeout('disconnect_handler()', 2000);
    });

     conn.on('error', err => {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            // db error 重新連線
            disconnect_handler();
        } else {
            throw err;
        }
    });
    exports.conn = conn;
}

exports.disconnect_handler = disconnect_handler;

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
const { Pool } = require('pg');
const URI = 'postgres://epjpbias:x8EXLORInDI6jL_40Gidr08KecR0atyl@salt.db.elephantsql.com:5432/epjpbias';

const bcrypt = require('bcryptjs');
const saltRounds = 10;


const pool = new Pool({
    connectionString: URI,
})

const postgresDB = {};

postgresDB.authenticate = (req, res, next)=>{
    pool.query(`SELECT DISTINCT * FROM users WHERE username=($1) LIMIT 1`,[req.body.username], (err, result)=>{
        bcrypt.compare(req.body.password, result.rows[0].password, (err, hash)=>{
            if(err) return new Error(err);
            if (hash){
                res.locals.authenticated = true;
            } else {
                res.locals.authenticated = false;
            }
            return next();
        })
    })
}
postgresDB.signUp = (req, res, next)=>{
    if (req.body.username && req.body.password){
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return new Error(err);
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                if(err) return new Error(err);
                pool.query('INSERT INTO users (username, password) VALUES($1, $2)', [req.body.username, hash], (err, result)=>{
                    if (err) return new Error('you suck at hashing passwords');
                    console.log(result)
                    res.locals.inserted = true;
                    return next();
                })
            });
        });    
    } else {
        res.locals.inserted = false;
        return next();
    }
}


module.exports = postgresDB;
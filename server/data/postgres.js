const { Pool } = require('pg');
//my elephantSQL connection, feel free to create your own FREE db and re-generate a 'users' table
const URI = 'postgres://epjpbias:x8EXLORInDI6jL_40Gidr08KecR0atyl@salt.db.elephantsql.com:5432/epjpbias';

//hashing passwords
const bcrypt = require('bcryptjs');
const saltRounds = 10;

//connecting to the pg database
const pool = new Pool({
    connectionString: URI,
})

const postgresDB = {};
//grabbing the row where the username is === to the input username (req.body.username)
// then checking if the password matches the hashed password, via bcrypt compare
postgresDB.authenticate = (req, res, next)=>{
   pool.query(`SELECT DISTINCT * FROM users WHERE username=($1) LIMIT 1`,[req.body.username], (err, result)=>{
        if (result === undefined || err){
            res.locals.authenticated = false;
            return next();
        } else {
        bcrypt.compare(req.body.password, result.rows[0].password, (err, hash)=>{
            if (err) {
                console.log('you suck at hashing passwords');
                res.locals.authenticated = false;
                return next()
            };
            if (hash){
                res.locals.authenticated = true;
            } else {
                res.locals.authenticated = false;
            }
            return next();
        })
        }
    })
}

//hashes the password and stores it in the database
postgresDB.signUp = (req, res, next)=>{
    if (req.body.username && req.body.password){
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return new Error(err);
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                if(err) return new Error(err);
                pool.query('INSERT INTO users (username, password) VALUES($1, $2)', [req.body.username, hash], (err, result)=>{
                    if (err) {
                        console.log('you suck at hashing passwords');
                        res.locals.inserted = false;
                        return next()
                    };
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
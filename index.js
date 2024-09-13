const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.get('/api/testing', (req,res) => {
    res.send('¡Hola Desarrollador!')
 })
 app.listen(9999,() => console.log('El servidor está en funcionamiento'));


 app.post('/api/signup' , (req,res) => {
    const id  = req.body.id;
    const username = req.body.username;
    const password = req.body.password;
    jwt.sign(id , 'secret_key' , (err,token) => {
       if(err){
          res.status(400).send({msg : 'Error'})
       }
  else {
          res.send({msg:'success' , token: token})
       }
    })
 })

 app.post('/api/login' , verifyToken , (req,res) => {
    res.send('You are Authorized!')
 })

 function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(403);
    jwt.verify(token, "secret_key", (err, user) => {
       if (err) return res.sendStatus(404);
       req.user = user;
       next();
    });
 }

 app.put("/api/logout", authToken, function (req, res) {
    const authHeader = req.headers["authorization"];
    jwt.sign(authHeader, "", { expiresIn: 1 } , (logout, err) => {
       if (logout) {
          res.send({msg : 'Has sido desconectado' });
       } else {
          res.send({msg:'Error'});
       }
    });
 });
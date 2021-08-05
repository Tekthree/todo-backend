'use strict';

require('dotenv').config();

//===================== dependencies ============================
const express = require('express');
const base64 = require('base-64');
const cors = require('cors');


//===================== db ============================
const { todos, users } = require('./model/index.js');


//===================== set up app ============================
const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());
app.use(express.json());

//===================== routes ============================

app.get("/", (req, res) => {
  res.status(200).send("todo app backend API is in full effect");
});

app.get('/todos', (req,res)=>{
  res.status(200).json({text: 'test'});
})

app.post('/todos', (req,res)=>{
  res.status(200).json({text: 'test'});
})

app.put('/todos/:id', (req,res)=>{
  res.status(200).json({text: 'test'});
})

app.delete('/todos/:id', (req,res)=>{
  res.status(200).json({text: 'test'});
})

app.post('/signup', async (req, res) => {

  let {username, password} = req.body;
  console.log(username, password);
  let user = await users.create({ username, password });
  res.json({user, token: user.token});
});

app.post('/signin', async (req, res) => {
  let encodedCreds = req.headers.authorization.split(' ')[1]; 
  let decodedCreds = base64.decode(encodedCreds) 
  let [username, password] = decodedCreds.split(':');
  let validUser = await users.authenticateBasic(username, password);
  res.json({
    user: validUser,
    token: validUser.token
  });
});


//===================== listen ============================
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));

module.exports = {
  app: app,
}
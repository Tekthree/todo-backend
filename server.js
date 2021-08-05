'use strict';

const express = require('express');
const base64 = require('base-64');
const cors = require('cors');
require('dotenv').config();

const { todos, users } = require('./model/index.js');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/todos', (req,res)=>{
  res.json({text: 'test'});
})

app.post('/todos', (req,res)=>{
  res.json({text: 'test'});
})

app.put('/todos/:id', (req,res)=>{
  res.json({text: 'test'});
})

app.delete('/todos/:id', (req,res)=>{
  res.json({text: 'test'});
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


module.exports = {
  app: app,
}
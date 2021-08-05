"use strict";
//-------------dependencies------------------//
const { Sequelize, DataTypes } = require("sequelize");

const todoSchema = require("./todo.schema.js");
const userSchema = require("./user.schema.js");

//--------------connects to database---------------//
let sequelize = new Sequelize(process.env.DATABASE_URL || "sqlite:memory:");

//--------------connects to schema---------------//
const todoModel = todoSchema(sequelize, DataTypes);
const userModel = userSchema(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  todos: todoModel,
  users: userModel,
};

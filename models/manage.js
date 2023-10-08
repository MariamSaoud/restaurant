const Sequelize =require('sequelize');
const sequelize= require('../database');
const Manager=require('./manager');
const Food=require('../models/food');
const manage = sequelize.define(
    'Manage',{
        Manageid:{
            type:Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            allowNull:false,
            primaryKey:true,
        }
    }
);
module.exports = manage;
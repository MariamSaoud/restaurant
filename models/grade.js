const Sequelize =require('sequelize');
const sequelize= require('../database');
const User= require('../models/user');
const Food= require('../models/food');
const grade = sequelize.define(
    'Grade',{
        Gradeid:{
            type:Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            allowNull:false,
            primaryKey:true,
        },
        GradeStars:{
            type:Sequelize.DataTypes.INTEGER,
        }
    }
);
module.exports = grade;

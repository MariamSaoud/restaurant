const Sequelize =require('sequelize');
const sequelize= require('../database');
const Manage=require('./manage');
const Food=require('./food');
const Manager = sequelize.define(
    'Manager',{
        Managerid:{
            type:Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            allowNull:false,
            primaryKey:true,
        },
        Managername:{
            type:Sequelize.DataTypes.STRING,
        },
        OwnerId:{
            type:Sequelize.DataTypes.INTEGER
        },
        Manageremail:{
            type:Sequelize.DataTypes.STRING,
            allowNull:false
        },
        Managerpassword:{type:Sequelize.DataTypes.STRING}
    }
);
module.exports = Manager;
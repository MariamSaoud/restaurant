const mysql2= require('mysql2');
const Sequelize=require('sequelize');
//connect to our schema 
const sequelize= new Sequelize('node-complete','root','mariameliassaoud0951489023@@',{dialect:'mysql',host:'localhost'});  //fourth argument options object  
module.exports=sequelize;
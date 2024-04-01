//1- npm init  2- npm install --save express 3-npm install --save mysql2  4-npm install --save sequelize after mysql2 5-npm install --save body-parser  6- npm install --save multer 7-npm install bcrypt 8- npm install jsonwebtoken 9-npm install joi 10-npm install fs 11-npm install nodemon
const express = require("express"); 
const path=require('path');
const fs=require('fs');
const bodyParser = require('body-parser');
const multer=require('multer');
const sequelize= require('./database');
const category=require('./models/category');
const Content=require('./models/content');
const Food=require('./models/food');
const FoodContent=require('./models/foodContent');
const User=require('./models/user');
const grade=require('./models/grade');
const same=require('./models/same');
const Tags=require('./models/tags');
const Manager=require('./models/manager');
const Manage=require('./models/manage');
const userRouter=require('./routers/user');
const managerRouter=require('./routers/manager');
const app= express();  //create express app & store it in a constant name app by running express as a function
//urlencoded
app.use(bodyParser.urlencoded({ extended: false }));        //urlencoded a function that have to execute and you can pass options to configurate it but you don't have to here
//it will not parse all possible bodies but it will parse bodies like one we're getting here ,if i have files i will parse different parser
app.use(bodyParser.json());

//use path
app.use(express.static(path.join(__dirname,'restaurant')));
app.use(express.static(path.join('/images',__dirname,'images')));

//set Headers
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','content-type,Authorization');
    next();
})
//multer package here after bodyParser before routes 
const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images');
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now() +'-'+file.originalname);
    }
});
const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/png'||file.mimetype==='image/jpg'||file.mimetype==='image/jpeg'){
        cb(null,true);
    }else{
        cb(null,false);
    }
}
app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single('image'));
//router use
app.use('/user',userRouter);
app.use('/manager',managerRouter);

//relationShip
User.hasMany(grade);
grade.belongsTo(User);

Food.hasMany(grade, {
    foreignKey: "FoodFoodid",
    as: "grades"
});
grade.belongsTo(Food, {
    foreignKey: "FoodFoodid",
    as: "food"
});

category.hasMany(Food);
Food.belongsTo(category);

Manager.hasMany(category);
category.belongsTo(Manager);

Manager.hasMany(Food);
Food.belongsTo(Manager);

Manager.hasMany(FoodContent);
FoodContent.belongsTo(Manager);

Manager.hasMany(Tags);
Tags.belongsTo(Manager);

Manager.hasMany(Manager);
Manager.belongsTo(Manager);

category.hasMany(category);
category.belongsTo(category);

Manager.belongsToMany(Food,{through:Manage});
Food.belongsToMany(Manager,{through:Manage});

Tags.belongsToMany(Food,{through:same});
Food.belongsToMany(Tags,{through:same});

FoodContent.belongsToMany(Food,{through:Content});
Food.belongsToMany(FoodContent,{through:Content});

//sequelize.sync({alter:true});  //to create DB force:true the data will go on but alter:true the data will still in DB
sequelize.authenticate();  //connect
app.listen(6005);
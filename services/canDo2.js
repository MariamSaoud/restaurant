const category=require('../models/category');
const Content=require('../models/content');
const Food=require('../models/food');
const FoodContent=require('../models/foodContent');
const User=require('../models/user');
const grade=require('../models/grade');
const same=require('../models/same');
const Tags=require('../models/tags');
const Manager=require('../models/manager');
const Manage=require('../models/manage');
const express= require('express');
/*
class FoodHelper {
    static async canDo(id, model) {
        const modelVar=model.findAll({where:{ManagerManagerid:id}}).then(data=>{
        if(data.Ownerid!=null) {return {msg:'ok'}}
        else{ return {msg:'Not authorized'}}
    }).catch(err=>console.log(err));
    }
}
module.exports = {FoodHelper};
*/


exports.canDo2 =(req,res,next)=>{
    const id= req.id;
    console.log(id);
    Food.findAll({where:{ManagerManagerid:id}}).then(data=>{
        console.log(data);
        if(data.length=== 0)  res.status(401).json({msg:'there are no elements to update or delete'})
        else{next();}
    }).catch(err=>console.log(err));
}
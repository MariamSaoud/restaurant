const Manager=require('../models/manager');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const SECRET_KEY="NOTESAPI";
module.exports=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    console.log(authHeader);
    if(!authHeader){
        return res.status(401).json({msg:'Not authenticated!!!'});
    }
    const token=authHeader.split(' ')[1];
    let decodedToken;
    try{
        decodedToken=jwt.verify(token,SECRET_KEY)
    }
    catch(err){
        return res.status(500).json({msg:'Error'});
    }
    if(!decodedToken){
        return res.status(401).json({msg:'Not authenticated'});
    }
    req.id= decodedToken.Managerid;
    next();
}
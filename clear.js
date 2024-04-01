const path=require('path');
const fs=require('fs');
const express = require("express"); 
const app=express(); 
exports.clearImage=filepath=>{
    filepath=path.join(__dirname,'..',filepath);
    fs.unlink(filepath,err=>{if(err) console.log(err)
    else{console.log("photo Deleted")}});
}
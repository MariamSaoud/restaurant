const Manager = require("../models/manager");
const express = require("express");
exports.isOwner = async (req, res, next) => {
    const Oid = req.id;
    console.log(Oid);
    const Owner = await Manager.findByPk(Oid);
    if (Owner.OwnerId !== 1) {
    return res.status(401).json({ msg: "Not authorized to add/update/delete anyone" });
    } else {
   // next();
    }

    next();
};
/*
class OwnerHelper {
    static async isOwner(id) {
        const Owner=Manager.findByPk(id);
if(Owner.Ownerid===0){
    return {msg:'is Owner'}
}else{
    return {msg:"isn't Owner"}
}
}
}
module.exports = {OwnerHelper};
*/

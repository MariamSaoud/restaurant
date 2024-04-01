//import all my models
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
const clearImage=require('../clear');
const basicAuthentication=require('../controller/basicAuthentication');
const Joi = require("joi");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const fs = require('fs');
const SECRET_KEY="NOTESAPI";
exports.addFood=(req,res,next)=>{
    const ManagerManagerid=req.id;
    const Foodname=req.body.Foodname;
    const CategoryCategoryid=req.body.CategoryCategoryid;
    const Image=req.file;
    if(!Image){
        return res.status(442).json({msg:'attached file is not an image'})
    }
    const Imageurl=Image.path;
    let food_id
    Food.create({
        Foodname:Foodname,
        CategoryCategoryid:CategoryCategoryid, 
        Foodurl:Imageurl,
        ManagerManagerid:ManagerManagerid 
    })
    .then(food=>{
        let x,y;
        food_id = food.Foodid
        console.log(req.body.Content);
            const myContent=JSON.parse(req.body.Content);
            console.log(myContent.c);
            for(let i=0;i<myContent.Content.length;i++){
                x=myContent.Content[i].FoodContentFoodContentid;
                y=myContent.Content[i].Quantity;
                Content.create({
                    FoodContentFoodContentid:x,Quantity:y,FoodFoodid: food_id
                })
            }
        })
    .then(mc=>{
        let x,y;
        const myTags=JSON.parse(req.body.tags);
        for(let i=0;i<myTags.tags.length;i++){
            x=myTags.tags[i].Tagname;
            y=myTags.tags[i].TagTagid;
            same.create({
                Samename:x,
                TagTagid:y ,
                FoodFoodid: food_id
            }).then((data)=>{ return res.send(data)})

        }
    })
    .catch(err=>console.log(err));
}
exports.updateFood=(req,res,next)=>{
    const Foodid=req.params.Foodid;
    const updateFoodname=req.body.Foodname;
    const updateimage=req.file;
    if(updateimage){  const Imageurl=updateimage.path;
        Food.update({Foodname:updateFoodname, Foodurl:Imageurl},
        { where:{
                Foodid:Foodid
            }}).then(data=>res.send({msg: 'updated'})).catch(err=>console.log(err));
            }
        else{
            Food.update({Foodname:updateFoodname},
                { where:{
                        Foodid:Foodid
                    }}).then(data=>res.send({msg: 'updated'})).catch(err=>console.log(err));
        }
        
    }
    /*Food.update({Foodname:updateFoodname},
        { where:{
                Foodid:Foodid
            }}).then(data=>res.send({msg: 'updated'})).catch(err=>console.log(err));  */
            
            /*Food.findByPk(Foodid).then(food=>{
        food.Foodname=updateFoodname;
        return food.save();
    })}   */
    /*Food.update({Foodname:updateFoodname},
    { where:{
            Foodid:Foodid
        }}).then(data=>res.send(data)).catch(err=>console.log(err));
}  */
exports.deleteFood=async (req,res,next)=>{
    
    let image;
    const food=req.params.Foodid;
    Food.findOne({where:{Foodid:food}}).then(data=>{image=data.Foodurl;
        console.log(image);
        console.log("image");
        console.log(data);
        fs.unlinkSync(image);
    }).catch(err=>console.log(err))
    Food.destroy({where:{Foodid:food}})
    .then(data=>res.status(200).send({message: 'deleted'})).catch(err=>console.log(err))

};
    /* Food.findByPk(food).then(food=>{
        food.destroy().then(data=>{data.save()}).then(data=>res.send(data)).catch(err=>console.log(err));

    })
    .catch(err=>console.log(err));
}   */
exports.addTag=async(req,res,next)=>{
    const SignUpSchema = Joi.object({
        Tagname:Joi.string().required(),
        });
        const result = await SignUpSchema.validate(req.body);
      //console.log(result);
        if (result.error) {
        return res.status(400).json({
            error: result.error.details[0].message,
        });
        }
    const tag=req.body.Tagname;
    const ManagerManagerid=req.id;
    Tags.create({Tagname:tag,ManagerManagerid:ManagerManagerid}).then(data=>res.send(data)).catch(err=>console.log(err));
}
exports.updateTag=async(req,res,next)=>{
    const SignUpSchema = Joi.object({
        Tagname:Joi.string().required()
        });
        const result = await SignUpSchema.validate(req.body);
      //console.log(result);
        if (result.error) {
        return res.status(400).json({
            error: result.error.details[0].message,
        });
        }
    const tagId=req.params.Tagid;
    const updatetag=req.body.Tagname;
    Tags.update({Tagname:updatetag},
        { where:{
                Tagid:tagId
            }}).then(data=>res.send({msg: 'updated'})).catch(err=>console.log(err));
        }
exports.deleteTag=async(req,res,next)=>{

    const tagid=req.params.Tagid;
    Tags.destroy({where:{Tagid:tagid}}).then(data=>res.send({msg: 'deleted'})).catch(err=>console.log(err));

}
exports.showTags=(req,res,next)=>{
    const tags=Tags.findAll().then(data=>{res.status(200).send(data)}).catch(err=>console.log(err));
}
exports.showFood=(req,res,next)=>{
    const food=Food.findAll().then(data=>{res.status(200).send(data)}).catch(err=>console.log(err));
}
exports.addFoodContent=async(req,res,next)=>{
    const SignUpSchema = Joi.object({
        FoodContentname:Joi.string().required(),
        });
        const result = await SignUpSchema.validate(req.body);
      //console.log(result);
        if (result.error) {
        return res.status(400).json({
            error: result.error.details[0].message,
        });
        }
    const FoodContentname=req.body.FoodContentname;
    const ManagerManagerid=req.id;
    FoodContent.create({FoodContentname:FoodContentname,ManagerManagerid:ManagerManagerid}).then(data=>res.send(data)).catch(err=>console.log(err));
}
exports.updateFoodContent=async(req,res,next)=>{
    const SignUpSchema = Joi.object({
        FoodContentname:Joi.string().required()
        });
        const result = await SignUpSchema.validate(req.body);
      //console.log(result);
        if (result.error) {
        return res.status(400).json({
            error: result.error.details[0].message,
        });
        }
    const FoodContentid=req.params.FoodContentid;
    const updateFoodContentname=req.body.FoodContentname;
    /*let foodcontent=FoodContent.findById(FoodContentid);
    FoodContent.FoodContentname=updateFoodContentname; */
    FoodContent.update({Foodname:updateFoodContentname},
    { where:{
            FoodContentid:FoodContentid
        }}).then(data=>res.send({msg:'updated'})).catch(err=>console.log(err));
    }
exports.deleteFoodContent=async(req,res,next)=>{
    const FoodContentid=req.params.FoodContentid;
    FoodContent.destroy({where:{FoodContentid:FoodContentid}}).then(data=>res.send({msg:'deleted'})).catch(err=>console.log(err));
}
exports.addCategory=async(req,res,next)=>{
    const SignUpSchema = Joi.object({
        Categoryname:Joi.string().required(),
        CategoryCategoryid:Joi.required()
        });
        const result = await SignUpSchema.validate(req.body);
      //console.log(result);
        if (result.error) {
        return res.status(400).json({
            error: result.error.details[0].message,
        });
        }
    console.log(req.body);
    const categoryname=req.body.Categoryname;
    const CategoryCategoryid = req.body.CategoryCategoryid;
    const ManagerManagerid=req.id;
    category.create({Categoryname:categoryname, CategoryCategoryid:CategoryCategoryid,ManagerManagerid:ManagerManagerid}).then(data=>res.send(data)).catch(err=>console.log(err));
}
exports.updateCategory=async(req,res,next)=>{
    const SignUpSchema = Joi.object({
        Categoryname:Joi.string().required()
        });
        const result = await SignUpSchema.validate(req.body);
        console.log(result);
        if (result.error) {
        return res.status(400).json({
            error: result.error.details[0].message,
        });
        }
    
    const Categoryid=req.params.Categoryid;
    const updateCategoryname=req.body.Categoryname;
    category.update({Categoryname:updateCategoryname},
    { where:{
        Categoryid:Categoryid
        }}).then(data=>res.send({msg:'updated'})).catch(err=>console.log(err));
    
    }
exports.deleteCategory=async(req,res,next)=>{
    const SignUpSchema = Joi.object({
        Categoryname:Joi.string().required()
        });
        const result = await SignUpSchema.validate(req.body);
      //console.log(result);
        if (result.error) {
        return res.status(400).json({
            error: result.error.details[0].message,
        });
        }
    const Categoryname=req.body.Categoryname;
    category.destroy({where:{Categoryname:Categoryname}}).then(data=>res.send({msg:'deleted'})).catch(err=>console.log(err));
    
}
exports.addManager=async(req,res,next)=>{
    const SignUpSchema = Joi.object({
        Manageremail: Joi.string().email().required(),
        Managerpassword: Joi.string().min(5).max(20).required(),
        Managername:Joi.string().required(),
        OwnerId:Joi.number().required()
        });
        const result = await SignUpSchema.validate(req.body);
      //console.log(result);
        if (result.error) {
        return res.status(400).json({
            error: result.error.details[0].message,
        });
        
        }
    const Managername=req.body.Managername;
    const OwnerId=req.body.OwnerId;
    const Manageremail=req.body.Manageremail;
    const Managerpassword=req.body.Managerpassword;
    Manager.create({Managername:Managername, OwnerId:OwnerId,Manageremail:Manageremail,Managerpassword:Managerpassword}).then(data=>res.send(data)).catch(err=>console.log(err));
    }
exports.updateManager=async(req,res,next)=>{
    const SignUpSchema = Joi.object({
        Manageremail: Joi.string().email().required(),
        Managerpassword: Joi.string().min(5).max(20).required(),
        Managername:Joi.string().required(),
        });
        const result = await SignUpSchema.validate(req.body);
      //console.log(result);
        if (result.error) {
        return res.status(400).json({
            error: result.error.details[0].message,
        });
        
        }
    const Managerid=req.params.Managerid;
    const updateManagername=req.body.Managername;
    const updateManageremail=req.body.Manageremail;
    const updateManagerpassword=req.body.Managerpassword;
    Manager.update({Managername:updateManagername,Manageremail:updateManageremail,Managerpassword:updateManagerpassword},
    { where:{
        Managerid:Managerid
        }}).then(data=>res.send({msg:'updated'})).catch(err=>console.log(err))};
exports.deleteManager=async(req,res,next)=>{
    const Managerid=req.params.Managerid;
    Manager.destroy({where:{Managerid:Managerid}}).then(data=>res.send({msg:'deleted'})).catch(err=>console.log(err))};

exports.logIn=async (req,res,next)=>{
    const Managername=req.body.Managername;
    const Manageremail=req.body.Manageremail;
    const Managerpassword=req.body.Managerpassword;
    try{
        const existingManager=await Manager.findOne({
            where:
            {Manageremail:Manageremail}
        });
        if(!existingManager){
            return res.status(404).json({msg:'Manager not found'});
        }
        const matchPassword=await bcrypt.compare(Managerpassword,existingManager.Managerpassword);
        if(!matchPassword){
            return res.status(400).json({message:'Invalid Password'});
        }
        const token =jwt.sign({ Manageremail: existingManager.Manageremail, Managerid: existingManager.Managerid },SECRET_KEY);
        return res.status(201).json({Manager:existingManager,token:token});
    }
    catch(error){
        console.log(error);
        res.status(500).json({msg:'something went wrong'});
    }
}
exports.signUp=async (req,res,next)=>{
    console.log(req.body);
    const SignUpSchema = Joi.object({
        Manageremail: Joi.string().email().required(),
        Managerpassword: Joi.string().min(5).max(20).required(),
        Managername:Joi.string().required(),
        OwnerId:Joi.number().required()
        });
        const result = await SignUpSchema.validate(req.body);
      //console.log(result);
        if (result.error) {
        return res.status(400).json({
            error: result.error.details[0].message,
        });
        
        }
    const Managername=req.body.Managername;
    const Manageremail=req.body.Manageremail;
    const Managerpassword=req.body.Managerpassword;
    const OwnerId=req.body.OwnerId;
    try{
        const existingManager= await Manager.findOne({
            where:{
                Manageremail:Manageremail
            }
        });
        console.log(existingManager);
        if(existingManager){
            return res.status(400).json({msg:'Manager already exists'});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(Managerpassword,salt);
        console.log(hashedPassword);
        const result=await Manager.create({Managername:Managername,Manageremail:Manageremail,Managerpassword:hashedPassword,OwnerId:OwnerId});
    const token=jwt.sign({Manageremail:result.Manageremail,Managerid:result.Managerid},SECRET_KEY)
    res.status(201).json({Manager:result,token:token})
}
    catch(error){
        console.log(error);
        res.status(500).json(error.message);
    }
}
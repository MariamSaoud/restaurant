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
const basicAuthentication=require('../controller/basicAuthentication');
const Joi = require("joi");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const SECRET_KEY="NOTESAPI";
exports.addFood=(req,res,next)=>{
    const Foodname=req.body.Foodname;
    const CategoryCategoryid=req.body.CategoryCategoryid;
    const Image=req.file;
    if(!Image){
        return res.status(442).json({msg:'attached file is not an image'})
    }
    const Imageurl=Image.path;
    
    Food.create({
        Foodname:Foodname,
        CategoryCategoryid:CategoryCategoryid, 
        Foodurl:Imageurl 
    })
    .then(
        data=>res.send(data)
    )
    .catch(err=>console.log(err));
}
exports.updateFood=(req,res,next)=>{
    const Foodid=req.body.Foodid;
    const updateFoodname=req.body.Foodname;
    const updateimage=req.file;
    if(image){Food.update({Foodname:updateFoodname, Foodurl:updateimage.path},
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
exports.deleteFood=(req,res,next)=>{
    const food=req.body.Foodid;
    Food.destroy({where:{Foodid:food}}).then(data=>res.status(200).send({message: 'deleted'})).catch(err=>console.log(err))
};
    /* Food.findByPk(food).then(food=>{
        food.destroy().then(data=>{data.save()}).then(data=>res.send(data)).catch(err=>console.log(err));

    })
    .catch(err=>console.log(err));
}   */
exports.addTag=(req,res,next)=>{
    const tag=req.body.Tagname;
    Tags.create({Tagname:tag}).then(data=>res.send(data)).catch(err=>console.log(err));
}
exports.updateTag=(req,res,next)=>{
    const tagId=req.body.Tagid;
    const updatetag=req.body.Tagname;
    Tags.update({Tagname:updatetag},
        { where:{
                Tagid:tagId
            }}).then(data=>res.send({msg: 'updated'})).catch(err=>console.log(err));
}
exports.deleteTag=(req,res,next)=>{
    const tagid=req.body.Tagid;
    Tags.destroy({where:{Tagid:tagid}}).then(data=>res.send({msg: 'deleted'})).catch(err=>console.log(err));
}
exports.showTags=(req,res,next)=>{
    const tags=Tags.findAll().then(data=>{res.status(200).send(data)}).catch(err=>console.log(err));
}
exports.showFood=(req,res,next)=>{
    const food=Food.findAll().then(data=>{res.status(200).send(data)}).catch(err=>console.log(err));
}
exports.addFoodContent=(req,res,next)=>{
    const FoodContentname=req.body.FoodContentname;
    FoodContent.create({FoodContentname:FoodContentname}).then(data=>res.send(data)).catch(err=>console.log(err));
}
exports.updateFoodContent=(req,res,next)=>{
    const FoodContentid=req.body.FoodContentid;
    const updateFoodContentname=req.body.FoodContentname;
    /*let foodcontent=FoodContent.findById(FoodContentid);
    FoodContent.FoodContentname=updateFoodContentname; */
    FoodContent.update({Foodname:updateFoodContentname},
    { where:{
            FoodContentid:FoodContentid
        }}).then(data=>res.send({msg:'updated'})).catch(err=>console.log(err));
}
exports.deleteFoodContent=(req,res,next)=>{
    const FoodContentid=req.body.FoodContentid;
    FoodContent.destroy({where:{FoodContentid:FoodContentid}}).then(data=>res.send({msg:'deleted'})).catch(err=>console.log(err));
}
exports.addCategory=(req,res,next)=>{
    console.log(req.body);
    const categoryname=req.body.Categoryname;
    const CategoryCategoryid = req.body.CategoryCategoryid;
    category.create({Categoryname:categoryname, CategoryCategoryid:CategoryCategoryid}).then(data=>res.send(data)).catch(err=>console.log(err));
}
exports.updateCategory=(req,res,next)=>{
    const Categoryid=req.body.Categoryid;
    const updateCategoryname=req.body.Categoryname;
    category.update({Categoryname:updateCategoryname},
    { where:{
        Categoryid:Categoryid
        }}).then(data=>res.send({msg:'updated'})).catch(err=>console.log(err));}
exports.deleteCategory=(req,res,next)=>{
    const Categoryname=req.body.Categoryname;
    category.destroy({where:{Categoryname:Categoryname}}).then(data=>res.send({msg:'deleted'})).catch(err=>console.log(err));
}
exports.addManager=(req,res,next)=>{
    const Managername=req.body.Managername;
    const OwnerId=req.body.OwnerId;
    const Manageremail=req.body.Manageremail;
    const Managerpassword=req.body.Managerpassword;
    Manager.create({Managername:Managername, OwnerId:OwnerId,Manageremail:Manageremail,Managerpassword:Managerpassword}).then(data=>res.send(data)).catch(err=>console.log(err));
}
exports.updateManager=(req,res,next)=>{
    const Managerid=req.body.Managerid;
    const updateManagername=req.body.Managername;
    const updateManageremail=req.body.Manageremail;
    const updateManagerpassword=req.body.Managerpassword;
    Manager.update({Managername:updateManagername,Manageremail:updateManageremail,Managerpassword:updateManagerpassword},
    { where:{
        Managerid:Managerid
        }}).then(data=>res.send({msg:'updated'})).catch(err=>console.log(err));}
exports.deleteManager=(req,res,next)=>{
    const Managerid=req.body.Managerid;
    Manager.destroy({where:{Managerid:Managerid}}).then(data=>res.send({msg:'deleted'})).catch(err=>console.log(err));
}
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
        const result=await Manager.create({Managername:Managername,Manageremail:Manageremail,Managerpassword:hashedPassword});
    const token=jwt.sign({Manageremail:result.Manageremail,Managerid:result.Managerid},SECRET_KEY)
    res.status(201).json({Manager:result,token:token})
}
    catch(error){
        console.log(error);
        res.status(500).json(error.message);
    }
}
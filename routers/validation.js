const express=require('express');
const Joi = require('joi');
const SignUpSchema=Joi.object({
    Useremail:Joi.string().email().required(),
    Userpassword:Joi.string().min(5).max(20).required(),
    Username:Joi.string().required()
}); 
const validateRequest = (SignUpSchema) => {
    const ret= async (req, res, next) => {
            const result = await SignUpSchema.validate(req.body);
          //console.log(result);
            if (result.error) {
            return res.status(400).json({
                error: result.error.details[0].message,
            });
            }
            //req.body = result.value.body;
          //next();        
    }
    } 
    module.exports=validateRequest;  
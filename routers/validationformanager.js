const express=require('express');
const Joi = require('joi');
const SignUpSchema=Joi.object({
    Manageremail:Joi.string().email().required(),
    Managerpassword:Joi.string().min(5).max(20).required(),
    Managername:Joi.string().required(),
    OwnerId:Joi.number()
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
    }
    } 
    module.exports=validateRequest;  
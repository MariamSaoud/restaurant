//add , update , delete food ,classify food, show tags
const express=require('express');
const basicAuthentication=require('../controller/basicAuthentication');
const router=express();//this is a function i execute this router is a mini express app tied to another express app or pluggable into the express app 
//we have to use router to now register things it will run tha same as app 
const managerController=require('../controller/manager');
const Joi = require('joi');
const validationformanager=require('../routers/validationformanager');
router.post('/add-newFood',basicAuthentication,managerController.addFood);
router.post('/update-Food',basicAuthentication,managerController.updateFood);
router.delete('/delete-Food',basicAuthentication,managerController.deleteFood);
router.post('/add-newTag',basicAuthentication,managerController.addTag);
router.post('/update-Tag',basicAuthentication,managerController.updateTag);
router.delete('/delete-Tag',basicAuthentication,managerController.deleteTag);
router.get('/show-Tags',basicAuthentication,managerController.showTags);
router.get('/show-food',basicAuthentication,managerController.showFood);
router.post('/add-newfContent',basicAuthentication,managerController.addFoodContent);
router.post('/update-fcontent',basicAuthentication,managerController.updateFoodContent);
router.delete('/delete-fcontent',basicAuthentication,managerController.deleteFoodContent);
router.post('/add-newCategory',basicAuthentication,managerController.addCategory);
router.post('/update-category',basicAuthentication,managerController.updateCategory);
router.delete('/delete-category',basicAuthentication,managerController.deleteCategory);
router.post('/add-newManager/',basicAuthentication,managerController.addManager);
router.post('/update-manager',basicAuthentication,managerController.updateManager);
router.delete('/delete-manager',basicAuthentication,managerController.deleteManager);
router.post('/login',basicAuthentication,managerController.logIn);
router.post('/sign-up',basicAuthentication,managerController.signUp);  
//protect routers...
module.exports=router;
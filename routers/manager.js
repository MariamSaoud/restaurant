//add , update , delete food ,classify food, show tags
const express=require('express');
const basicAuthentication=require('../controller/basicAuthentication');
const router=express();//this is a function i execute this router is a mini express app tied to another express app or pluggable into the express app 
//we have to use router to now register things it will run tha same as app 
const managerController=require('../controller/manager');
const isOwner=require('../routers/isOwner');
const canDo=require('../services/canDo');
const canDo2=require('../services/canDo2');
const canDo3=require('../services/canDo3');
const canDo4=require('../services/canDo4');
const Joi = require('joi');
const validationformanager=require('../routers/validationformanager');
router.post('/add-newFood',basicAuthentication,managerController.addFood);
router.post('/update-Food/:Foodid',basicAuthentication,canDo2.canDo2,managerController.updateFood);
router.delete('/delete-Food/:Foodid',basicAuthentication,canDo2.canDo2,managerController.deleteFood);
router.post('/add-newTag',basicAuthentication,managerController.addTag);
router.post('/update-Tag/:Tagid',basicAuthentication,canDo.canDo,managerController.updateTag);
router.delete('/delete-Tag/:Tagid',basicAuthentication,canDo.canDo,managerController.deleteTag);
router.get('/show-Tags',basicAuthentication,managerController.showTags);
router.get('/show-food',basicAuthentication,managerController.showFood);
router.post('/add-newfContent',basicAuthentication,managerController.addFoodContent);
router.post('/update-fcontent/:FoodContentid',basicAuthentication,canDo3.canDo3,managerController.updateFoodContent);
router.delete('/delete-fcontent/:FoodContentid',basicAuthentication,canDo3.canDo3,managerController.deleteFoodContent);
router.post('/add-newCategory',basicAuthentication,managerController.addCategory);
router.post('/update-category/:Categoryid',basicAuthentication,canDo4.canDo4,managerController.updateCategory);
router.delete('/delete-category',basicAuthentication,canDo4.canDo4,managerController.deleteCategory);
router.post('/add-newManager/',basicAuthentication, isOwner.isOwner,managerController.addManager);
router.post('/update-manager/:Managerid',basicAuthentication, isOwner.isOwner,managerController.updateManager);
router.delete('/delete-manager/:Managerid',basicAuthentication, isOwner.isOwner, managerController.deleteManager);
router.post('/login',validationformanager,managerController.logIn);
router.post('/sign-up',managerController.signUp);  

module.exports=router;
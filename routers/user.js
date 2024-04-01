//show food, show food content&show tags  , send grade
const express=require('express');
const router=express();//this is a function i execute this router is a mini express app tied to another express app or pluggable into the express app 
//we have to use router to now register things it will run tha same as app 
const UserController=require('../controller/user');
const UserAuth=require('../controller/basicAuthenticationUser');
const validation=require('../routers/validation');

router.get('/show-all',UserAuth,UserController.showAll);
router.get('/show-content-tags',UserAuth,UserController.showContent);
router.get('/show-grade',UserAuth,UserController.showGrade);
router.post('/grade-it/:Foodid',UserAuth,UserController.gradeIt);
router.get('/show-about-food',UserAuth,UserController.showAboutFood);
router.post('/login',validation,UserController.logIn);
router.post('/sign-up',UserController.signUp);
module.exports=router;
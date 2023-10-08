//show food, show food content&show tags  , send grade
const express=require('express');
const router=express();//this is a function i execute this router is a mini express app tied to another express app or pluggable into the express app 
//we have to use router to now register things it will run tha same as app 
const UserController=require('../controller/user');
const validation=require('../routers/validation');

router.get('/show-all',UserController.showAll);
router.get('/show-content-tags',UserController.showContent);
router.post('/grade-it',UserController.gradeIt);
router.post('/login',UserController.logIn);
router.post('/sign-up',UserController.signUp);
module.exports=router;
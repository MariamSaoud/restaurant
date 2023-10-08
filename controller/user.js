//import all my models
const category = require("../models/category");
const Content = require("../models/content");
const Food = require("../models/food");
const FoodContent = require("../models/foodContent");
const User = require("../models/user");
const grade = require("../models/grade");
const same = require("../models/same");
const Tags = require("../models/tags");
const Manager = require("../models/manager");
const Manage = require("../models/manage");
const { Model } = require("sequelize");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";
exports.showAll = (req, res, next) => {
    const food = Food.findAll()
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => console.log(err));
};
exports.showContent = (req, res, next) => {
    const food = Food.findAll({
    include: [
        {
        model: Tags,
        },
        {
        model: FoodContent,
        },
    ],
});
res.status(200).json({ food });
};
exports.gradeIt = (req, res, next) => {
const GradeStars = req.body.GradeStars;
grade
    .create({ GradeStars: GradeStars })
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
};
exports.logIn = async (req, res, next) => {
const Username = req.body.Username;
const Useremail = req.body.Useremail;
const Userpassword = req.body.Userpassword;
try {
    const existingUser = await User.findOne({
        where: { Useremail: Useremail },
    });
    if (!existingUser) {
        return res.status(404).json({ msg: "User not found" });
    }
    const matchPassword = await bcrypt.compare(
        Userpassword,
        existingUser.Userpassword
    );
    if (!matchPassword) {
        return res.status(400).json({ message: "Invalid Password" });
    }
    const token = jwt.sign(
        { Useremail: existingUser.Useremail, Userid: existingUser.Userid },
        SECRET_KEY
    );
    return res.status(201).json({ User: existingUser, token: token });
    } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong" });
    }
};
exports.signUp = async (req, res, next) => {

    const SignUpSchema = Joi.object({
    Useremail: Joi.string().email().required(),
    Userpassword: Joi.string().min(5).max(20).required(),
    Username:Joi.string().required()
    });
    const result = await SignUpSchema.validate(req.body);
  //console.log(result);
    if (result.error) {
    return res.status(400).json({
        error: result.error.details[0].message,
    });
    
    }

const Username = req.body.Username;
const Useremail = req.body.Useremail;
const Userpassword = req.body.Userpassword;
try {
    const existingUser = await User.findOne({
        where: {
        Useremail: Useremail,
        },
    });
    console.log(existingUser);
    if (existingUser) {
        return res.status(400).json({ msg: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Userpassword, salt);
    console.log(hashedPassword);
    const result = await User.create({
        Username: Username,
        Useremail: Useremail,
        Userpassword: hashedPassword,
    });
    const token = jwt.sign(
    { Useremail: result.Useremail, Userid: result.Userid },
    SECRET_KEY
    );
    res.status(201).json({ User: result, token: token });
    } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
    }
};

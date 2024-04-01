const Sequelize = require("sequelize");
const sequelize = require("../database");
const category = require("../models/category");
const Content = require("../models/content");
const Food = require("../models/food");
const FoodContent = require("../models/foodContent");
const grade = require("./grade");
const same = require("../models/same");
const Tags = require("../models/tags");
const Manager = require("./manager");
const Manage = require("../models/manage");
const User = sequelize.define("User", {
  Userid: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  Username: {
    type: Sequelize.DataTypes.STRING,
    unique: true,
  },
  Useremail: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  Userpassword: { type: Sequelize.DataTypes.STRING },
});
module.exports = User;

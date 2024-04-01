const Sequelize = require("sequelize");
const sequelize = require("../database");
const Manage = require("../models/manage");
const Manager = require("./manager");
const category = require("../models/category");
const Content = require("../models/content");
const FoodContent = require("../models/foodContent");
const grade = require("./grade");
const same = require("../models/same");
const Tags = require("../models/tags");
const User = require("../models/user");
const Food = sequelize.define("Food", {
  Foodid: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  Foodname: { type: Sequelize.DataTypes.STRING },
  Foodurl: { type: Sequelize.DataTypes.STRING },
});
module.exports = Food;

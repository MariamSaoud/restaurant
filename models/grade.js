const Sequelize = require("sequelize");
const sequelize = require("../database");
const User = require("./user");
const Food = require("./food");
const Grade = sequelize.define("Grade", {
Gradeid: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
},
GradeStars: {
    type: Sequelize.DataTypes.INTEGER,
}
});
module.exports = Grade;

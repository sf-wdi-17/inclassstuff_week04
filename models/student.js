"use strict";
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define("Student", {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        this.belongsTo(models.Course);
        // associations can be defined here
      }
    }
  });
  return Student;
};
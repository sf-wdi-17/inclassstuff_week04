"use strict";
module.exports = function(sequelize, DataTypes) {
  var Course = sequelize.define("Course", {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        this.hasMany(models.Student, {as: "Students"});
        // associations can be defined here
      }
    }
  });
  return Course;
};
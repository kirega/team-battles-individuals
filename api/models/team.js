'use strict';
module.exports = (sequelize, DataTypes) => {
  const team = sequelize.define('team', {
    teamName: DataTypes.STRING,
    totalElos: DataTypes.INTEGER
  }, {});
  team.associate = function(models) {
  };
  return team;
};
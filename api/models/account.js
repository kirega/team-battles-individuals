'use strict';
module.exports = (sequelize, DataTypes) => {
  const account = sequelize.define('account', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    permission: DataTypes.STRING
  }, {});
  account.associate = function(models) {
    // associations can be defined here
  };
  return account;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: DataTypes.STRING,
    her: DataTypes.INTEGER,
    phoneNumber: DataTypes.STRING,
    paymentStatus: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};

// return queryInterface.addColumn('Users', 'paymentStatus', {
//   type: Sequelize.BOOLEAN,
//   defaultValue: false,
//   allowNull: false
// });
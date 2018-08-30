'use strict';
module.exports = (sequelize, DataTypes) => {
  const Referral = sequelize.define('Referral', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // referrerId: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // }
  }, {});
  Referral.associate = models => {
    // associations can be defined here
    Referral.belongsTo(models.Contact, {
      foreignKey: 'referrerId',
      // onDelete: 'CASCADE'
    })
    Referral.belongsToMany(models.Event, {
      through: 'ReferralEvent'
    })
  };
  return Referral;
};
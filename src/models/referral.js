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
    points: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Referral.associate = models => {
    // associations can be defined here
    Referral.belongsTo(models.Contact, {
      foreignKey: {
        name : 'referrerId',
        unique: false,
        allowNull: true
      },
      onDelete: 'CASCADE'
    })
    Referral.belongsToMany(models.Event, {
      through: 'ReferralEvent'
    })
  };
  return Referral;
};

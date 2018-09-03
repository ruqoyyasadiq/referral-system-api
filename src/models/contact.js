'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
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
  Contact.associate = models => {
    // associations can be defined here
    Contact.hasMany(models.Referral, {
      foreignKey: {
        name : 'referrerId',
        unique: false,
        allowNull: true
      },
      as: 'Referrers'
    })
    Contact.belongsToMany(models.Event, {
      through: 'ContactEvent'
    })
  };
  return Contact;
};
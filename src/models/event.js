'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    description: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    contactId: {
      type: DataTypes.STRING,
    },
    referrerId: {
      type: DataTypes.STRING
    }
  }, {});
  Event.associate = models => {
    // associations can be defined here
    Event.belongsToMany(models.Contact, {
      through: 'ContactEvent'
    })
    Event.belongsToMany(models.Referral, {
      through: 'ReferralEvent'
    })
  };
  return Event;
};
// models/Pourboire.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Pourboire = sequelize.define('Pourboire', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  review: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'pourboires',
  timestamps: true, // Pour `createdAt` et `updatedAt`
});

module.exports = Pourboire;

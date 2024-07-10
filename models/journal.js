
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('./index');

class Journal extends Model {}

Journal.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Journal'
});

Journal.associate = (models) => {
  Journal.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
};

module.exports = Journal;

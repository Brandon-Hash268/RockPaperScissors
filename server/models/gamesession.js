'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GameSession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GameSession.belongsTo(models.User,{foreignKey:"PlayerId1"})
      GameSession.belongsTo(models.User,{foreignKey:"PlayerId2"})
    }
  }
  GameSession.init({
    PlayerId1: DataTypes.INTEGER,
    PlayerId2: DataTypes.INTEGER,
    PlayerMove1: DataTypes.STRING,
    PlayerMove2: DataTypes.STRING,
    result: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'GameSession',
  });
  return GameSession;
};
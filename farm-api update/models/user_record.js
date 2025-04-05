'use strict';
const {Model} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class UserRecord extends Model {
    /**
     * Helper UserRecord for defining associations.
     * This UserRecord is not a part of sequelize lifecycle.
     * The `models/index` file will call this UserRecord automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserRecord.init({
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    uid: DataTypes.BIGINT.UNSIGNED,
    rid: DataTypes.BIGINT.UNSIGNED
  }, {
    sequelize,
    modelName: 'UserRecord',
    timestamps: false // 禁用时间戳
    
  });
  return UserRecord;
};
  'use strict';
const {Model} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Remind extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'uid', // 外键字段名，对应 User 模型中的 id 字段
        targetKey: 'id', // 目标模型的主键字段名，对应 User 模型中的 id 字段
        as: 'user', // 关联别名，用于在查询时引用
      })
    }
  }
  Remind.init({
    id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  uid: DataTypes.BIGINT.UNSIGNED,
  block: DataTypes.STRING,
  time: DataTypes.DATE,
  delay: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  content: DataTypes.TEXT,
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
    sequelize,
    modelName: 'Remind',
    timestamps: true
    
  });
  return Remind;
};
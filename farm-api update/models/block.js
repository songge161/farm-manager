'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Block extends Model {
    /**
     * Helper Block for defining associations.
     * This Block is not a part of sequelize lifecycle.
     * The `models/index` file will call this Block automatically.
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
  Block.init({
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    uid: DataTypes.BIGINT.UNSIGNED,
    block: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Block',
    timestamps: false // 禁用时间戳

  });
  return Block;
};
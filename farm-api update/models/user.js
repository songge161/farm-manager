'use strict';
const {Model} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper User for defining associations.
     * This User is not a part of sequelize lifecycle.
     * The `models/index` file will call this User automatically.
     */
    static associate(models) {
      // define association here
     this.belongsToMany(models.UserRecord,{
        through:"UserRecords", // 关联表的名称
        foreignKey: 'uid', // 外键字段名，对应 UserRecord 模型中的 uid 字段
        otherKey: 'rid', // 外键字段名，对应 UserRecord 模型中的 rid 字段
        as: 'userRecords', // 关联别名，用于在查询时引用
      })
      this.hasMany(models.Remind,{ 
        foreignKey:"uid",
        targetKey:"id", // 目标模型的主键字段名，对应 User 模型中的 id 字段
        as:"reminds"})
      this.hasMany(models.Block,{
        foreignKey:"uid",
        targetKey:"id", // 目标模型的主键字段名，对应 User 模型中的 id 字段
        as:"blocks"})
    }
  }
  User.init({
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      allowNull: false
    },
    username: {
      type: DataTypes.CHAR(20),
      allowNull: false
    },
    phone: {
      type: DataTypes.CHAR(11),
      allowNull: false,
      unique: true
    },
    avatar: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true
    
  });
  return User;
};
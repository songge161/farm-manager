'use strict';
const { Model } = require('sequelize');
  module.exports = (sequelize, DataTypes) => {
    class Method extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        this.belongsTo(models.Record, {
          foreignKey: 'rid',// 外键字段名，对应 Record 模型中的 id 字段
          targetKey: 'id',// 目标模型的主键字段名，对应 Record 模型中的 id 字段
          as: 'record', // 关联别名
        }
      )
        // define association here
      }
    }
    Method.init({
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      rid:{ type:DataTypes.BIGINT.UNSIGNED
      },
      title: DataTypes.STRING,
      operator: DataTypes.STRING,
      time: DataTypes.DATE,
      weather: DataTypes.STRING,
      temperature: DataTypes.STRING,
      phase: DataTypes.STRING,
      cleanMethod: {
        type:DataTypes.STRING,//别名
        field: 'clean_method'
      },
      detail: DataTypes.TEXT,
      extra: DataTypes.TEXT,
      images: DataTypes.JSON,
      state: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      }
    }, {
      
      sequelize,
      modelName: 'Method',
      timestamps: true // 禁用时间戳
      
    });
    return Method;
  };
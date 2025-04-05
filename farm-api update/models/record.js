'use strict';
const {Model } = require('sequelize');

  module.exports = (sequelize, DataTypes) => {
    class Record extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        // define association here
        this.hasMany(models.Method, {
          as: 'methods',
          foreignKey: 'rid', // 外键字段名，对应 Method 模型中的 rid 字段
          sourceKey: 'id' // 源字段名，对应 Record 模型中的 id 字段
        }),
        
       this.belongsToMany(models.UserRecord,{
          through:"UserRecords", // 关联表的名称
          foreignKey: 'rid', // 外键字段名，对应 UserRecord 模型中的 rid 字段
          otherKey: 'uid', // 外键字段名，对应 UserRecord 模型中的 uid 字段
          as: 'users', // 关联别名，用于在查询时引用
        })
      }
    }
    Record.init({
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      block: DataTypes.STRING,
      batch: DataTypes.STRING,
      area: DataTypes.STRING,
      crop: DataTypes.STRING,
      newRecordDate: {type:DataTypes.DATE,
        field: 'new_record_date'
      },
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
      modelName: 'Record',
      timestamps: true
      
    });
    return Record;
  };
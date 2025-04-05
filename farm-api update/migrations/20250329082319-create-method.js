'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Methods', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      rid: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Records',  // 关联到 Records 表
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true
      },
      operator: {
        type: Sequelize.STRING,
        allowNull: true
      },
      time: {
        type: Sequelize.DATE,
        allowNull: true
      },
      weather: {
        type: Sequelize.STRING,
        allowNull: true
      },
      temperature: {
        type: Sequelize.STRING,
        allowNull: true
      },
      phase: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cleanMethod: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'clean_method'  // 数据库使用蛇形命名
      },
      detail: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      extra: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      images: {
        type: Sequelize.JSON,
        allowNull: true
      },
      state: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        field: 'updated_at'
      }
    });

    // 为外键添加索引
    await queryInterface.addIndex('Methods', ['rid']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Methods');
  }
};
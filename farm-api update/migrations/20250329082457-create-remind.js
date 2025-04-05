'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reminds', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      uid: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Users',  // 关联到 Users 表
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      block: {
        type: Sequelize.STRING,
        allowNull: true
      },
      time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      delay: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
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
    await queryInterface.addIndex('Reminds', ['uid']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reminds');
  }
};
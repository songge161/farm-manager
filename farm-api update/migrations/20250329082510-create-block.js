'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Blocks', {
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
        allowNull: false
      }
    });

    // 为外键添加索引
    await queryInterface.addIndex('Blocks', ['uid']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Blocks');
  }
};
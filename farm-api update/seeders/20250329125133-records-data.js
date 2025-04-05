'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    //获取Methods表中的time字段
   
    

    

    for (let i = 1; i <= 10; i++) {
      await queryInterface.bulkInsert('Records', [{
        id: i,
        block: `区块${i}`,
        batch: `批次${i}`,
        area: `区域${i}`,
        crop: `作物${i}`,
        new_record_date: new Date(),
        state: Math.random() < 0.5,
        created_at: new Date(),
        updated_at: new Date()

      }], {


      });
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Records', null, {});
  }
};

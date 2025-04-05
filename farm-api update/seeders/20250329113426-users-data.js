'use strict';

/** @type {import('sequelize-cli').Migration} */
const now = new Date();
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
   for(let i=0;i<100;i++){
    await queryInterface.bulkInsert('Users', [{
      id: i,
      username: `用户${i}`,
      phone: `138${i.toString().padStart(8,'0')}`,
      avatar: `https://example.com/avatar${i}.jpg`,
      createdAt: new Date(now.getTime()-2000*i),
      updatedAt: new Date(now.getTime()-1000*i)
    }], 
    {})
   }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};

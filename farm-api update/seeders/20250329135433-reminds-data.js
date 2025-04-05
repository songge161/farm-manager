'use strict';


/** @type {import('sequelize-cli').Migration} */

module.exports = {
  
  //获取当前时间
  


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
    
    for(let i=1;i<100;i++){
      let currentDate = new Date(new Date().getTime() - 1000*60*60*24*3 + Math.random()*1000*60*60*24*7);
      let delay = 1;

      if(currentDate.getTime() - new Date().getTime() > 0){
        delay = 0;
      }
      await queryInterface.bulkInsert('Reminds', [{
        id: i,
        uid: i%10,
        block: `区块${i%5}`,
        time: currentDate,
        delay:delay,
        content: `区块${i%5}的作物需要浇水了`,
        state: Math.random() < 0.5,
        created_at:new Date(),
        updated_at: new Date(),
      }], {})
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Reminds', null, {});
  }
};

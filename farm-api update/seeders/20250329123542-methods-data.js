'use strict';
//输入数字后，自动补为3位数
function padNumber(num) {
  return num.toString().padStart(3, '0');
}
//自动生成天气信息
function generateWeather() {
  const weatherConditions = ['晴天', '阴天', '小雨', '小雪', '大雾'];
  return weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
}
//自动生成用户信息，根据数字生成，例如有0-9个数字，每个数字对应一个用户，用户名为随机的名字
function generateUser(id) {
  const users = ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十', '郑十一', '冯十二'];
  return users[id];
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    for (let i = 1; i <= 100; i++) {
 


      await queryInterface.bulkInsert('Methods', [{
        id: i,
        rid: i%10,
        title: `方法${i}`,
        operator: generateUser(i%10),
        time: new Date(new Date().getTime()-Math.floor(Math.random()*100000)),
        weather: generateWeather(),
        temperature: `${Math.floor(Math.random()*30)}°C`,
        phase: `阶段${i%5}`,
        clean_method: `清水清理`,
        detail: `详细信息${i}`,
        extra: `额外信息${i}`,
        images: JSON.stringify([`https://img.freepik.com/free-photo/vegetable-garden_1150-6${padNumber(i)}.jpg`, `https://img.freepik.com/free-photo/rice-field_1150-6${padNumber(i+1)}.jpg`]),
        state: Math.random() < 0.5,
        created_at: new Date(),
        updated_at: new Date()

      }])
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Methods', null, {});
  }
};

## 1.原始结构

所有表：

User 用户表

Record 记录表

Method 操作表

User_Remind 用户提醒中间表

User_Record 用户记录中间表

Record_Method 记录操作中间表

User_Block 用户与区块对应表

属性类型根据我所说的找最优的类型生成吧，然后帮我补充上去



-User属性：

id: // int值，但是是8位数开始累计如10000001，

username: //如CHAR类型，

phone:

avatar: 







-Record

id:

  block: DataTypes.STRING,

  batch: DataTypes.STRING,

  area: DataTypes.STRING,

  crop: DataTypes.STRING,

  newRecordDate: DataTypes.DATE,

  createdAt: DataTypes.DATE,

  updatedAt: DataTypes.DATE

​	state://是否删除



-Method

​	id:

  title: DataTypes.STRING,

  operator: DataTypes.STRING,

  time: DataTypes.DATE,

  weather: DataTypes.STRING,

  temperature: DataTypes.STRING,

  phase: DataTypes.STRING,

  cleanMehod: DataTypes.STRING,

  detail: DataTypes.STRING,

  extra: DataTypes.STRING

​	images://有多个图片，最好是数组吧，因为只需要拿数据，不用查找内容

​	state://是否删除



User_Remind



remindId://提醒id

uid://用户id

block://区块号，提醒出是哪个区块号（record.block）

time：//提醒时间

delay:  //如果超过提醒时间则为True

content://提醒内容

state://是否删除



User_Record

id:

uid：//用户id

rid://记录id



Record_Method

id:

rid://记录id

mid：//操作id







User_Block

id:

uid:

block://区块号，与user所管理的block有关，不止一个
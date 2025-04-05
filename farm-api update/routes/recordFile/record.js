var express = require('express');
var router = express.Router();
const { Record } = require('../../models')
const { Op } = require('sequelize')
//本页面用户最基本的获取记录信息
//以及直接进行增删改查
//面向前端非展示方面
//以及对后台使用


//获取操作最新时间
// async function getRecordLastTime(rid) {
//   const lastTime = await Method.findAll({
//     attributes: ['time'],
//     order: [['time', 'DESC']],
//     limit: 1,
//     where: { rid: { [Op.like]: rid } }
//   });
//   console.log(lastTime);

//   // 返回查找的值
//   return lastTime;
// }

// 使用示例
// async function getLastTime(rid) {
//   try {
//     const result = await getRecordLastTime(rid);
//     console.log(result);
//     // 处理返回的结果
//     if (result.length > 0) {
//       const time = result[0].dataValues.time; // 提取 time 值
//       console.log('Last Time:', time);
//       return time;
//     } else {
//       console.log('No records found.');
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }











//获取全部记录
router.get('/', async function (req, res, next) {
  try {
    const queryParams = req.query;
    let condition = {};
    const { id, uid, block,startTime, endTime,pageNum } = queryParams;
    //将时间转为时间戳
    const start = queryParams.startTime? new Date(startTime).getTime() : null;
    const end = queryParams.endTime? new Date(endTime).getTime() : null;
    
    if (start && end) {
      condition.where = { ...condition.where, newRecordDate: { [Op.between]: [start, end] } }
    } else if (start) {
      condition.where = { ...condition.where, newRecordDate: { [Op.gte]: start } }
    }
    else if (end) {
      condition.where = { ...condition.where, newRecordDate: { [Op.lte]: end } }
    }

    if(id){
      condition.where = { ...condition.where, id: { [Op.like]: id } }
    }
    if (uid) {
      condition.where = { ...condition.where, uid: { [Op.like]: uid } }
    }
    if (block) {
      condition.where = { ...condition.where, block: { [Op.like]: block } }
    }
    if (pageNum) {
      condition.limit = 20;
      condition.offset = (pageNum - 1) * 10;
    }

    const records = await Record.findAndCountAll(condition)


    //查找到它时修改数据库中newRecordDate记录
    // if (id) {
    //   const tResult = await getRecordLastTime(id);
    //   const changeTime = tResult[0].dataValues.time
    //   const record = await Record.findByPk(id)
    //   if (record.newRecordDate != changeTime) {
    //     console.log(changeTime);
    //     record.update({ newRecordDate: changeTime })
    //   }
    // }


    res.json(
      {
        body: {
          errCode: res.statusCode,
          status: true,
          message: '获取全部记录成功',
          data: records
        }
      }
    )

  } catch (error) {
    res.status(500).json(
      {
        body: {
          errCode: res.statusCode,
          status: false,
          message: '获取全部记录失败',
          data: [error.message]
        }
      }
    )
  }

}

)

//将state改为false
router.put('/:id', async function (req, res, next) {
 
  const { id } = req.params;
  try {
    const record = await Record.findByPk(id)
    if (record) {
      record.update({ state: false })
      res.json(
        {
          body: {
            errCode: res.statusCode,
            status: true,
            message: '修改记录成功',
            data: record
          }
        }
      )
    } else {
      res.status(404).json(
        {
          body: {
            errCode: res.statusCode,
            status: false,
            message: '修改失败',

          }
        }
      )
    }
  }catch (error) {
    res.status(500).json(
      {
        body: {
          errCode: res.statusCode,
          status: false,
          message: '修改记录失败',
          data: [error.message]
        }
      }
    )
  }
})

//获取文章详情
router.get('/:id', async function (req, res, next) {
  const { id } = req.params
  try {
    const record = await Record.findByPk(id)
    if (record) {

      res.json(
        {
          body: {
            errCode: res.statusCode,
            status: true,
            message: '获取记录详情成功',
            data: record
          } 
        }
      )
    } else {
      res.status(404).json(
        {
          body: {
            errCode: res.statusCode,
            status: false,
            message: '获取失败',

          }
        }
      )
    }


  } catch (error) {
    res.status(500).json(
      {
        body: {
          errCode: res.statusCode,
          status: false,
          message: '获取记录详情失败',
          data: [error.message]
        }
      }
    )

  }
})



module.exports = router;

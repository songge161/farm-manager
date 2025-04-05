var express = require('express');
var router = express.Router();
const { Method } = require('../../models')
const { Op, condition } = require('sequelize')
/* GET home page. */
//本页面用户最基本的获取操作信息
//以及直接进行增删改查
//面向前端非展示方面
//以及对后台使用



//获取操作
router.get('/', async function (req, res, next) {
  try {


    const queryParams = req.query;
    let condition = {};
    const { id, rid, startTime, endTime, timeASC,arrFind } = queryParams;

    //将时间转为时间戳
    const start = queryParams.startTime ? new Date(startTime).getTime() : null;
    const end = queryParams.endTime ? new Date(endTime).getTime() : null;



    //时间排序
    if (timeASC) {
      // condition.order =
      //   [['time', (timeASC == true) ? "ASC" : 'DESC']]
      condition = { ...condition, order:[['time', (timeASC == true) ? "ASC" : 'DESC']] }
    }
    //根据id查询
    if (id) {
      condition.where = { ...condition.where, id: { [Op.like]: id } }
    }

    //根据rid查询
    if (rid) {
      condition.where = { ...condition.where, rid: { [Op.like]: rid } }
    }

    //时间范围查询，需要同时传入startTime和endTime，如果只传入其中一个，则只按其中一个条件查询

    if (start && end) {
      condition.where = { ...condition.where, time: { [Op.between]: [start, end] } }
    } else if (start) {
      condition.where = { ...condition.where, time: { [Op.gte]: start } }
    }
    else if (end) {
      condition.where = { ...condition.where, time: { [Op.lte]: end } }

    }
    console.log(condition);

    const methods = await Method.findAndCountAll(condition)
    
    res.json(
      {
        body: {
          errCode: res.statusCode,
          status: true,
          message: '获取全部操作',
          data: methods,
          query: queryParams
        }
      }
    )
  } catch (error) {
    res.status(500).json(
      {
        body: {
          errCode: res.statusCode,
          status: false,
          message: '获取全部操作失败',
          data: [error.message]
        }
      }
    )
  }

}

)


//获取文章详情

router.get('/:rid', async function (req, res, next) {
  const { rid } = req.params
  try {
    const method = await Method.findByPk(rid)
    if (method) {

      res.json(
        {
          body: {
            errCode: res.statusCode,
            status: true,
            message: '获取操作详情成功',
            data: method
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
          message: '获取操作详情失败',
          data: [error.message]
        }
      }
    )

  }
})
//删除文章
router.delete('/:id', async function (req, res, next) {
  try {
    const { id } = req.params
    const method = await Method.findByPk(id)

    if (!method) {
      res.status(404).json(
        {
          body: {
            errCode: res.statusCode,
            status: false,
            message: '删除操作失败',

          }
        }
      )
      return
    }
    await method.destroy()
    res.json(
      {
        body: {
          errCode: res.statusCode,
          status: true,
          message: '删除操作成功'
        }
      }
    )

  } catch (error) {

  }
})


//修改操作
router.put('/:id', async function (req, res, next) {
  try {
    const { id } = req.params
    const method = await Method.findByPk(id)
    if (method) {
      await method.update(req.body)
      res.json(
        {
          body: {
            errCode: res.statusCode,
            status: true,
            message: '更新操作成功',
            data: method
          }
        }
      )
    } else {
      res.status(404).json(
        {
          body: {
            errCode: res.statusCode,
            status: false,
            message: '操作未找到',

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
          message: '更新操作失败',
          data: [error.message]
        }
      }
    )

  }

})

module.exports = router;

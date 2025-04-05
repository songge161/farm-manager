var express = require('express');
var router = express.Router();
const { Remind } = require('../../models')
const { Op } = require('sequelize')


//获取操作
router.get('/', async function (req, res, next) {
  try {
    const queryParams = req.query;
    let condition = {};
    const metions = await Remind.findAndCountAll(condition)
    res.json(
      {
        body: {
          errCode: res.statusCode,
          status: true,
          message: '获取提醒成功',
          data: metions,
          query: queryParams
        }
      }
    )
  }catch(err){
    res.status(500).json(
      {
        body: {
          errCode: res.statusCode,
          status: false,
          message: '获取提醒失败',
          data: [err.message]
        }
      }
    )

  }
})

module.exports = router;

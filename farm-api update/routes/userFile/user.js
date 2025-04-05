var express = require('express');
var router = express.Router();
const { User } = require('../../models')
const { Op } = require('sequelize')


router.get('/', async function (req, res, next) {
  try {
    const queryParams = req.query;
    let condition = {};
    const users = await User.findAndCountAll(condition)
    res.json(
      {
        body: {
          errCode: res.statusCode,
          status: true,
          message: '获取用户成功',
          data: users,
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
          message: '获取用户失败',
          data: [err.message]
        }
      }
    )

  }
})


module.exports = router;

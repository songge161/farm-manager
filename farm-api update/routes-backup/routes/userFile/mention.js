var express = require('express');
var router = express.Router();
const { Remind } = require('../../models')
const { Op } = require('sequelize')

router.get('/', async function (req, res, next) {
  try {
    const queryParams = req.query;
    let condition = {};
  }catch(err){

  }
})

module.exports = router;

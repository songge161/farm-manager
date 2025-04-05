var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json(
    {
      body:{message:"Hello World321"}
    }
  )
});
module.exports = router;

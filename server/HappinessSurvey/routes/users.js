var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.put('/record_my_feeling', function(req, res, next) {

});

module.exports = router;

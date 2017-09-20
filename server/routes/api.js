var express = require('express');
var router = express.Router();

/* /api starting endpoint */
router.get('/foo', function(req, res, next) {
  res.json({
    foo: 'bar'
  })
});



router.get('/register', function(req, res, next) {
	
})

module.exports = router;

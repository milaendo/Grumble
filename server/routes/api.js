var express = require('express');
var router = express.Router();
const mysql = require('mysql')

const conn = mysql.createConnection({
  host: config.get('db.host'),
  database: config.get('db.database'),
  user: config.get('db.user'),
  password: config.get('db.password')
})

/* /api starting endpoint */
router.post('/register', function(req, res, next) {
	const user_name = req.body.user_name
	const password = req.body.password

	const sql='INSERT INTO users (user_name, password, display_name) values (?, ?, ?);'
	conn.query(sql,[user_name, password, display_name],function(err,results,fields){
		if (err){
			res.json({
				message:'user info not inserted'
			})
		}
		else {
			console.log('successfully inserted', results)
			res.json({
				message:'user info inserted'
			})
		}
	})
});



router.get('/register', function(req, res, next) {
	
})

module.exports = router;

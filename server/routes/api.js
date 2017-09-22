var express = require('express');
var router = express.Router();
const mysql = require('mysql')
const config = require('config')

const conn = mysql.createConnection({
  host: config.get('db.host'),
  database: config.get('db.database'),
  user: config.get('db.user'),
  password: config.get('db.password')
})


//////////////TEMPORARY GET GRUMBS FOR NOW/////////////////////////////////

router.get('/grumbs', function(req, res, next) {

	const sql='SELECT * FROM Grumbles'
	conn.query(sql, function(err, results, fields){
		if (err){
			res.json({
				message: 'Could not pull data'
			})
		}
		else {
			res.json({
				message: 'Data sucessfully pulled',
				grumbles: results
			})
		}
	})
});



///////////USER REGISTRATION////////////////////////////////////////////
/* /api starting endpoint */
router.post('/register', function(req, res, next) {
	console.log("Backend", req.body)
	const user_name = req.body.username
	const password = req.body.password
	const display_name = req.body.displayName

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




module.exports = router;
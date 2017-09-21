var express = require('express');
var router = express.Router();
const mysql = require('mysql')
const config = require('config')

const conn = mysql.createConnection({
  host: config.get('db.host'),
  database: config.get('db.database'),
  user: config.get('db.user'),
  password: config.get('db.password'),
})
conn.on("error",function(err){
	console.log(err)
})
/* /api starting endpoint */
router.post('/register', function(req, res, next) {
	console.log("Backend", req.body)
	const user_name = req.body.username
	const password = req.body.password
	const display_name = req.body.displayName

	const sql='INSERT INTO users (user_name, password, display_name) values (?, ?, ?);'
	conn.query(sql,[user_name, password, display_name],function(err,results,fields){
		if (err){
			console.log(err)
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

router.post('/grumb', function(req,res,next){
	const grumb = req.body.grumb
	const userid = req.params.id

	const sql = 'insert into grumbs (grumb,userid) values (?,?)'
	conn.query(sql,[grumb,userid], function(err,results,fields){
		if (err){
			console.log(err)
			res.json({
				message:"grumb was not created"
			})
		}
		else {
			console.log("grumb created", results)
			res.json({
				message:"grumb created successfully"
			})
		}
	})
})
module.exports = router;
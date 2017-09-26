var express = require('express');
var router = express.Router();
const mysql = require('mysql')
const config = require('config')

const conn = mysql.createPool({
	connectionLimit : 10,
  host: config.get('db.host'),
  database: config.get('db.database'),
  user: config.get('db.user'),
  password: config.get('db.password'),
})
conn.on("error",function(err){
	console.log(err)
})

//////post response////////////
router.post('/response', function(req,res,next){
	const parentid = req.body.parentid
	const userid = req.body.userid
	const grumb = req.body.grumb
	const sql = `insert into grumbs (grumb, userid, parentid) values (?,?,?);`

	conn.query(sql, [grumb, userid, parentid], function(err,results,fields){
		if (err){
			console.log(err)
			res.json({
				message: 'response not entered'
			})
		}
		else {
			console.log('response', results)
			res.json({
				message:'response entered',
				response: results
			})
		}
	})
})

//////single grumb/////////////
router.get('/singleGrumb/:grumbid', function(req,res,next){
	const id = req.params.grumbid
	const sql=`	SELECT g.*, u.display_name,g.timestamp
				FROM grumbs g
			    JOIN users u 
			    ON g.userid = u.id
				WHERE parentid IS NULL and g.id=?`
	conn.query(sql, [id], function(err,results,fields){
		if(err){
			console.log(err)
			res.json({
				message: 'Cannot view singleGrumb'
			})
		}
		else {
			console.log('singlegrumb',results)
			res.json({
				message: 'heres yer grumb',
				grumb:results
			})
		}
	})
})

//////////////GET GRUMBS/////////////////////////////////

router.get('/grumbs', function(req, res, next) {

	const sql=`
	SELECT g.*, u.display_name
	FROM grumbs g
    JOIN users u 
    ON g.userid = u.id
	WHERE parentid IS NULL
	ORDER BY timestamp DESC`

	conn.query(sql, function(err, results, fields){
		if (err){
			res.json({
				message: 'Could not pull data'
			})
		}
		else {
			res.json({
				message: 'Data sucessfully pulled',
				grumbs: results
			})
		}
	})
});



///////////USER REGISTRATION///////////////////////////////////////////
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
///////////POSTING A GRUMB//////////////////////////////////////////////////////
router.post('/grumb', function(req,res,next){
	const grumb = req.body.grumb
	const userid = req.body.id

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
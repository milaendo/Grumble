const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


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

//////////downvote////////////////

router.post('/downvote', function(req,res,next){
	const userid = req.body.userid
	const grumbid = req.body.grumbid
	const parentid = req.body.parentid
	const sql = `insert into votes (downvote, userid, grumbid, parentid) values (1, ?, ?, ?)`

	conn.query(sql, [userid,grumbid, parentid], function(err, results,fields){
		if (err){
			console.log(err)
			res.json({
				message: 'downvote fool'
			})
		}else {
			console.log('vote', results)
			res.json({
				message: 'downvote win'
			})
		}
	})
})

//////////////upvote////////////////

router.post('/upvote', function(req,res,next){
	const userid = req.body.userid
	const grumbid = req.body.grumbid
	const parentid = req.body.parentid
	const sql = `insert into votes (upvote, userid, grumbid, parentid) values (1, ?, ?, ?)`
	conn.query(sql, [userid,grumbid,parentid], function(err, results,fields){
		if (err){
			console.log(err)
			res.json({
				message: 'upvote fool'
			})
		}else {
			console.log('voteup', results)
			res.json({
				message: 'upvote win'
			})
		}
	})
})

//////post response////////////

router.post('/response', function(req,res,next){
	const parentid = req.body.parentid
	const userid = req.body.userid
	const response = req.body.response
	const sql = `insert into grumbs (grumb, userid, parentid) values (?,?,?);`

	conn.query(sql, [response, userid, parentid], function(err,results,fields){
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

/////////////////////GET RESPONSES////////////////////////////////////////////

router.get('/responses/:grumbid', function(req, res, next){

	const id = req.params.grumbid

	const sql=`	
	SELECT g.*, u.display_name, g.timestamp
	FROM grumbs g
	JOIN users u 
	ON g.userid = u.id
	WHERE parentid =?
	ORDER BY timestamp DESC`

	conn.query(sql, [id], function(err,results,next){
		if(err){
			console.log(err)
			res.json({
				message: 'Cannot view responses'
			})
		}
		else {
			res.json({
				message: 'Here are the responses',
				responses: results
			})
		}
	})
})




//////////////////////single grumb////////////////////////////////////////////////
////////NEED TO PULL VOTE DIFFERENTIAL AND TOTAL VOTE COUNT VIA JOIN WITH VOTE TABLE
router.get('/singleGrumb/:grumbid', function(req,res,next){
	const id = req.params.grumbid
	const sql=`	SELECT g.*, u.display_name,g.timestamp
				FROM grumbs g
			    JOIN users u 
			    ON g.userid = u.id
				WHERE parentid IS NULL and g.id=?`
	conn.query(sql, [id], function(err,results,next){
		if(err){
			console.log(err)
			res.json({
				message: 'Cannot view singleGrumb'
			})
		}
		else {
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

router.post('/register', function(req, res, next) {
	
	const user_name = req.body.username
	const password = req.body.password
	const display_name = req.body.displayName

	const sql=`
	INSERT INTO users (user_name, password, display_name) 
	VALUES (?, ?, ?);`


	bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {

	
	conn.query(sql,[user_name, hash, display_name],function(err,results,fields){
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
	})
	})
});



/////////////LOGIN IN/////////////////////////////////////////////////////////////

router.post('/token', function(req, res, next) {
	const username = req.body.username
	const password = req.body.password

	const sql = `
    SELECT password, id, display_name FROM users
    WHERE user_name = ?`


    conn.query(sql, [username], function(err, results, fields){
    const hashedPassword = results[0].password
    const userid = results[0].id
    const displayName = results[0].display_name

    bcrypt.compare(password, hashedPassword).then(function(result){
      if (result) {
        res.json({
          token: jwt.sign({username}, config.get('secret'), { expiresIn: config.get('sessionLengthInSeconds') }),
          username: username,
          userid: userid,
          displayName: displayName
        })
      } else {
        res.status(401).json({
          message: 'Invalid Credentials'
        })
      }
    }).catch(function(err){
      console.log(err)
    })
  })
})




///////////POSTING A GRUMB//////////////////////////////////////////////////////

router.post('/grumb', function(req,res,next){
	const grumb = req.body.grumb
	const userid = req.body.user

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

module.exports = router
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



////////////GET SUMS OF VOTES FOR PARTICULAR GRUMB///////////////////////////

router.post('/getvote', function(req, res, next){
	const grumbid = req.body.grumbid
	const sql = `
	SELECT sum(downvote) as downvote, sum(upvote) as upvote
	FROM votes 
	WHERE grumbid = ? 
	`

	conn.query(sql, [grumbid], function(err, results, fields){
		if(err){
			res.json({
				message:'votes not sent'
			})
		}
		else{
			if(results[0].length = 0){
				res.json({
					message:'there are no votes'
					
				})
			}
			else {
				res.json({
				message:'heres yer votes',
				upvote:results[0].upvote,
				downvote:results[0].downvote
				})
			}
		}
	})
})



//////////GATHER ALL VOTE DATA////////

router.get('/getvotes', function(req, res, next){
	const grumbid = req.body.grumbid
	const sql = `
	SELECT *
	FROM votes 
	`

	conn.query(sql, function(err, results, fields){
		if(err){
			res.json({
				message:'votes not sent'
			})
		}
		else{
			if(results[0].length = 0){
				res.json({
					message:'there are no votes'
					
				})
			}
			else {
				res.json({
				message:'heres yer votes',
				votes: results
				})
			}
		}
	})
})

//////////downvote////////////////

router.post('/downvote', function(req, res, next){
	const userid = req.body.userid
	const grumbid = req.body.grumbid
	const parentid = req.body.parentid 
	////////// inserting vote//////////////

	const sql = `
	INSERT INTO
	votes (downvote, userid, grumbid, parentid) 
	VALUES (1, ?, ?, ?)`

	////////checking to see if they have voted//////////

	const checkVote = `
	SELECT 
	userid, parentid
	FROM
	votes
	WHERE
	userid = ? and grumbid = ?`
    ////////parent delete will delete all responses and votes attached to it////////

    const rmGrumb = `
    UPDATE grumbs 
    SET active = false 
    WHERE id = ?`

    ///////checking to see if they voted

    const voteTally = ` 
    SELECT 
    SUM(upvote - downvote) AS total
    FROM
    votes
    WHERE
    grumbid = ?`

    conn.query(checkVote, [userid, grumbid], function(err, results, fields){
    	console.log('length', results.length)
    	if(err){
    		res.json({
    			message:'NO VOTE FOR YOU'
    		})
    	}
    	else if(results.length>0){
    		res.json({
    			message:'YOU ALREADY VOTED IDIOT'
    		})
    	}
    	////voting
    	else {
    		conn.query(sql, [userid,grumbid,parentid], function(err, results,fields){
    			if (err){
    				console.log(err)
    				res.json({
    					message: 'downvote fool'
    				})
    			}
    			else{
    				//////grabbing vote totals ///////
    				conn.query(voteTally, [grumbid], function(err, results, fields){
    					console.log("vote totals", results[0].total)
    					if(err){
    						console.log(err)
    						res.json({
    							message: 'Could not select votes'
    						})
    					}
    					else if (results[0].total <= -10){
    						///////deleting all responses to parent id //////
    						console.log('rmgrumb', grumbid)
    						conn.query(rmGrumb, [grumbid], function(err, results, fields){
    							if(err){
    								console.log(err)
    								res.json({
    									message: 'parentId not deleted.'
    								})
    							}
    							else {
		    						res.json({
		    							message: 'Congrats, you voted this grumb off the island.'
		    							})
		    						}    									
    						})
    					}
    					///////checking to see if this post is close to -10 votes/////  					
 						
    					else {
		    				console.log('vote', results)
		    				res.json({
		    					message: 'downvote win'
		    				})
		    			}
    				})
    			}	
    		})
    	}
    })
	
})

//////////////upvote////////////////

router.post('/upvote', function(req,res,next){
	const userid = req.body.userid
	const grumbid = req.body.grumbid
	const parentid = req.body.parentid

	const sql = `
	INSERT INTO 
	votes (upvote, userid, grumbid, parentid) 
	VALUES (1, ?, ?, ?)`

	const checkVote = `
	SELECT 
	userid, grumbid
	FROM
	votes
	WHERE
	userid = ? and grumbid = ?`

    conn.query(checkVote, [userid,grumbid], function(err,results,fields){
    	if(err){
    		res.json({
    			message:'NO VOTE FOR YOU'
    		})
    	}
    	else if(results.length>0){
    		res.json({
    			message:'YOU ALREADY VOTED IDIOT'
    		})
    	}
    	else {
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
    	}

    })
	
})

//////post response////////////

router.post('/response', function(req,res,next){
	const parentid = req.body.parentid
	const userid = req.body.userid
	const response = req.body.response
	const sql = `
	INSERT INTO 
	grumbs (grumb, userid, parentid) 
	VALUES (?,?,?);`

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

	SELECT 
    SUM(v.downvote) AS downvote,
    SUM(v.upvote) AS upvote,
    v.grumbid,
    g.*,
    u.display_name
	FROM
    grumbs g
        LEFT JOIN
    votes v ON g.id = grumbid
        JOIN
    users u ON g.userid = u.id
    WHERE g.parentid = ?
	GROUP BY g.id
	ORDER BY g.timestamp DESC
	`

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

	const sql=`	
	SELECT g.*, u.display_name
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
	SELECT 
    SUM(v.downvote) AS downvote,
    SUM(v.upvote) AS upvote,
    v.grumbid,
    g.*,
    u.display_name
	FROM
    grumbs g
        LEFT JOIN
    votes v ON g.id = grumbid
        JOIN
    users u ON g.userid = u.id
    WHERE g.parentid IS NULL
	GROUP BY g.id
	ORDER BY g.timestamp DESC`

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
	INSERT INTO 
	users (user_name, password, display_name) 
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
    SELECT password, id, display_name 
    FROM users
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

	const sql = `
	INSERT INTO 
	grumbs (grumb,userid)
	values (?,?)`
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
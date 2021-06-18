const jwt = require('jsonwebtoken');

exports.handler = (req, res) => {
  
	jwt.verify(req.body.token, process.env.JWT_SECRET, function(err, user){
		if(err) {
		  return res.status(401).json({
			msg: 'error-token'
		  })
		}
	});
	
}
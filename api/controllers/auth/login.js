const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

exports.handler = (req, res) => {
  
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({
		msg: errors.array()[0].msg
      })
    }
  
    try {
      const user = {
        user: req.body.login,
      }
      
      const token = jwt.sign(user, process.env.JWT_SECRET, { 
        expiresIn: '1d'
      })
      
      res.json({
        token 
      })
  
    } catch (e) {
      console.log(e)
    } 
}
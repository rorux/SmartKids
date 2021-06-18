const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const User = require('../../models/user');

exports.handler = async (req, res) => {
    try {
      const {username, login, password} = req.body
      
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({
          msg: errors.array()[0].msg
        })
      }
  
      const hashPassword = await bcrypt.hash(password, 10);
      const user = new User({
        username, login, password: hashPassword
      })
      await user.save()
      res.json({
        msg: "Created new User"
      })
  
    } catch (e) {
      console.log(e)
    }
}

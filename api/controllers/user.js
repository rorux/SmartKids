const jwt = require('jsonwebtoken');
const User = require('../models/user')

exports.info = (req, res) => {
	const subjectsRest = {
		math: {
			level: 0,
			levelRest: 5
		},
		rus: {
			level: 0,
			levelRest: 5
		}
	};
	try {
		jwt.verify(req.body.token, process.env.JWT_SECRET, function(err, user){
			if(user) {
				const candidate = User.findOne({login: user.user}, function(err, user) {
					if (user){
						const subjects = {}; // объекты предметов
						
							user.subjects.forEach((item) => {
								subjects[item.subject] = item;
								if(item.tasks) {
									const level = item.progress.length;
									const levelQuantityArr = item["tasks"].filter(elem => +elem.level === +level);
									let levelQuantity = 0;
									for(let i = levelQuantityArr.length - 1; i >= 0; i--) {
										if(levelQuantityArr[i]["result"] == "correct") {
											++levelQuantity;
										} else break;
									}
									const levelRest = (level, levelQuantity) => {
										if(+level === 0) {
											return (5 - levelQuantity);
										} else if(+level === 1) {
											return (10 - levelQuantity);
										} else {
											return (15 - levelQuantity);
										}
									}
									subjectsRest[item.subject].level = level;
									subjectsRest[item.subject].levelRest = levelRest(level, levelQuantity);
								}
							});
						return res.json({info: Object.assign({}, { login: user.login, created: user.created, username: user.username, subjects: subjects, subjectsRest })});
					} else {
						console.log('no user');
					}
				});
			} else {
				return res.status(422).json({
					msg: "error-token"
				})
			}
		});
	} catch (e) {
      console.log(e)
    }
	
}
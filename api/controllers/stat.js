const jwt = require('jsonwebtoken');
const User = require('../models/user')

const transformDayMonth = str => (str.toString().length === 1) ? '0' + str.toString() : str;

const humanDate = date => {
	const dateFormat = new Date(date);
	return transformDayMonth(dateFormat.getDate()) + '.' + transformDayMonth(dateFormat.getMonth() + 1) + '.' + dateFormat.getFullYear();
};

exports.handler = async (req, res) => {
	
	let userObj = {};
	try {
		jwt.verify(req.body.token, process.env.JWT_SECRET, await function(err, userData){
			if(err) {
			  return res.status(401).json({
				msg: 'error-token'
			  })
			}
			userObj = Object.assign({}, userData);
		});
	} catch(e) {
		console.log(e)
	}
	
	// общий массив на выход
	const resArray = {
		level: 0,
		total: {
			quantity: 0,
			correct: 0,
			wrong: 0
		},
		today: {
			quantity: 0,
			correct: 0,
			wrong: 0
		}
	}
	
	try {
		const user = await User.findOne({ login: userObj.user });
		
		if(user.subjects.length > 0) {
			const subjectArr = user.subjects.filter(sub => sub.subject === req.body.sub);
			
			if(subjectArr.length > 0) {
				const subject = subjectArr[0];
				resArray.level = subject.progress.length;
				resArray.total.quantity = subject.tasks.length;
				resArray.total.correct = subject.tasks.filter(el => el.result === 'correct').length;
				resArray.total.wrong = subject.tasks.filter(el => el.result === 'wrong').length;
				
				const taskToday = subject.tasks.filter(el => {
					const now = new Date();
					const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
					const taskDate = new Date(Date.parse(el.date));
					const taskDateMidnight = new Date(taskDate.getFullYear(), taskDate.getMonth(), taskDate.getDate());
					return (Date.parse(nowMidnight) == Date.parse(taskDateMidnight));
				});
				
				resArray.today.quantity = taskToday.length;
				resArray.today.correct = taskToday.filter(el => el.result === 'correct').length;
				resArray.today.wrong = taskToday.filter(el => el.result === 'wrong').length;
			}
		}
		
		return res.json({
			msg: resArray
		});
	} catch(e) {
		console.log(e)
	}
}

exports.total = async (req, res) => {
	
	let userObj = {};
	try {
		jwt.verify(req.body.token, process.env.JWT_SECRET, await function(err, userData){
			if(err) {
			  return res.status(401).json({
				msg: 'error-token'
			  })
			}
			userObj = Object.assign({}, userData);
		});
	} catch(e) {
		console.log(e)
	}
	
	try {
		const user = await User.findOne({ login: userObj.user });
		
		if(user.subjects.length === 0) {
			return res.json({
				msg: []
			});
		}
		
		const resArray = [];
		const subName = []; // массив названий предметов 
		const tasksArr = []; // массив массивов заданий
		const taskStat = []; // массив статистики по предметам
		const dateStat = []; // массив дат по предметам
		
		user.subjects.forEach(sub => {
			resArray.push({'subject': sub.subject, dates: [], total: [], correct: [], wrong: []});
			subName.push(sub.subject);
			tasksArr.push(sub.tasks);
		});
		
		tasksArr.forEach((sub, subInd) => {
			sub.forEach((taskObj) => {
				const taskDate = new Date(Date.parse(taskObj.date));
				const taskDateMidnight = new Date(taskDate.getFullYear(), taskDate.getMonth(), taskDate.getDate());
				if(!taskStat[subInd]) {
					taskStat[subInd] = {};
				}
				if(!dateStat[subInd]) {
					dateStat[subInd] = [];
				}
				if(!taskStat[subInd][taskDateMidnight]) {
					taskStat[subInd][taskDateMidnight] = {correct: 0, wrong: 0, total: 0};
				}
				if(!dateStat[subInd].includes(taskDateMidnight.toString())) {
					dateStat[subInd].push(taskDateMidnight.toString());
				}
				if(taskObj.result === 'correct') {
					++taskStat[subInd][taskDateMidnight]['correct'];
				}
				if(taskObj.result === 'wrong') {
					++taskStat[subInd][taskDateMidnight]['wrong'];
				}
				++taskStat[subInd][taskDateMidnight]['total'];
			});
		});
		
		dateStat.forEach((arr, ind) => {
			arr.forEach(date => {
				resArray[ind]['dates'].push(humanDate(date));
				resArray[ind]['total'].push(taskStat[ind][date]['total']);
				resArray[ind]['correct'].push(taskStat[ind][date]['correct']);
				resArray[ind]['wrong'].push(taskStat[ind][date]['wrong']);
			});
		});
		
		return res.json({
				msg: resArray
			});
		
	} catch(e) {
		console.log(e)
	}
}
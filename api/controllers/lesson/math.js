const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const randomNum = (min, max) => Math.round(Math.random() * (max - min) + min);
const operations = ['+', '-', '*', ':'];
const operate = (a, operation, b) => {
	switch(operation) {
		case '+':
			return a + b;
		break;
		
		case '-':
			return a - b;
		break;
		
		case '*':
			return a * b;
		break;
		
		case ':':
			return a / b;
		break;
	}
}

const levelMap = [4, 9, 14, 14, 14, 14]; // количество правильных ответов (-1)

const checkLevel = (result, progress, tasks) => {
	const level = progress.length;
	const lastTasksArr = level => (level < 6) ? tasks.slice(-levelMap[level]) : tasks.slice(-14);
	const quantity = level => (level < 6) ? levelMap[level] : 14;
		
	if(lastTasksArr(level).every(el => (el.result === 'correct' && el.level === level)) && tasks.length >= quantity(level)) {
		return 'new level';
	} else {
		return 'old level';
	}
}

const simpleTask = (min, max) => {
	const task = {}
	const operation = operations[randomNum(0,1)]; // выбираем '+' или '-'
	const firstNum = randomNum(min, max);
	const secondNum = randomNum(min, max);
	if(operation == '+') {
		task.expression = [firstNum, operation ,secondNum];
		task.answer = operate(firstNum, operation ,secondNum);
		task.type = operation
	} else {
		const firstNumEnd = Math.max(firstNum, secondNum);
		const secondNumEnd = Math.min(firstNum, secondNum);
		task.expression = [firstNumEnd, operation ,secondNumEnd];
		task.answer = operate(firstNumEnd, operation ,secondNumEnd);
		task.type = operation
	}
	return task;
}

const simpleNextTask = () => {
	const task = {}
	const operationOne = operations[randomNum(0,1)]; // выбираем '+' или '-'
	let firstNum = 0;
	let secondNum = 0;
	let thirdNum = 0;
	let resOne = 0;
	let answer = 0;
	
	const firstNumPre = randomNum(0, 9);
	const secondNumPre = randomNum(0, 9);
	if(operationOne == '+') {
		firstNum = firstNumPre;
		secondNum = secondNumPre;
	} else {
		firstNum = Math.max(firstNumPre, secondNumPre);
		secondNum = Math.min(firstNumPre, secondNumPre);
	}
	resOne = operate(firstNum, operationOne ,secondNum);
	
	const operationTwo = operations[randomNum(0,1)];
	if(operationTwo == '+') {
		thirdNum = randomNum(0, 9);
		answer = resOne + thirdNum;
	} else {
		thirdNum = randomNum(0, 9);
		while(thirdNum > resOne) {
			thirdNum = randomNum(0, 9);
		}
		answer = resOne - thirdNum;
	}
	task.expression = [firstNum, operationOne, secondNum, operationTwo, thirdNum];
	task.answer = answer;
	task.type = operationOne + ' ' + operationTwo;
	return task;
}

const mediumTask = () => {
	const task = {};
	const operation = operations[randomNum(2,3)]; // выбираем '*' или ':'
	const firstNum = randomNum(1, 9);
	let secondNum = 1;
	if(operation == '*') {
		(firstNum => {
			if(firstNum == 1) {
				secondNum = randomNum(1, 9);
			} else if(firstNum >= 2 && firstNum <= 4) {
				secondNum = randomNum(1, 4);
			} else if(firstNum == 5 || firstNum == 6) {
				secondNum = randomNum(1, 3);
			} else {
				secondNum = randomNum(1, 2);
			}
		})();
	} else {
		let digits = []; // массив с цифрами, на которые первое число делится без остатка
		for(let i = 1; i <= firstNum; i++) {
			if(!(firstNum % i)) {
				digits.push(i)
			}
		}
		const secDigNum = digits.length - 1;
		const randomInd = randomNum(0, secDigNum);
		secondNum = digits[randomInd];
	}
	task.expression = [firstNum, operation, secondNum];
	task.answer = operate(firstNum, operation ,secondNum);
	task.type = operation;
	return task;
}

exports.getTask = async (req, res) => {
	
	try {
		jwt.verify(req.body.token, process.env.JWT_SECRET, await function(err, userData){
			if(err) {
			  return res.status(401).json({
				msg: 'error-token'
			  })
			}
		});
	} catch(e) {
		console.log(e)
	}
	const level = +req.body.level;
	const createTask = level => {
		switch(level) {
			case 0:
				return simpleTask(0, 9); // сложение/вычитание (2 числа)
			break;
			
			case 1:
				return simpleTask(0, 9);
			break;
				
			case 2:
				return simpleNextTask(); // сложение/вычитание (3 числа)
			break;
			
			case 3:
				return simpleTask(8, 13);
			break;
			
			case 4:
				return simpleTask(12, 19);
			break;
			
			case 5:
				return mediumTask(); // умножение/деление (2 цифры)
			break;
		}
	}
	
	const taskGener = level => (level < 6) ? createTask(level) : createTask(randomNum(2,5));
	
	const task = taskGener(level);
	
	res.json({
		task
	  });
	
}

exports.addTaskDb = async (req, res) => {
	
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
	
	const sub = 'math';
	const task = {
		result: req.body.req.result,
		type: req.body.req.type,
		date: req.body.req.date,
		level: req.body.req.level
	};
	const newSub = {
		subject: sub,
		progress: [],
		tasks: [task]
	}
	
	const user = await User.findOne({ login: userObj.user });
	const userUpdate = Object.assign({}, user._doc);
	
	if(userUpdate.subjects.length > 0) {
		let findSub = -1;
		userUpdate.subjects.forEach((item, ind) => {
			if(item.subject === sub) findSub = ind;
		});
		
		if(findSub > -1) {
			let progress = userUpdate.subjects[findSub].progress;
			let tasks = userUpdate.subjects[findSub].tasks;
			let newOrOldLevel = 'old level';
			if(task.result === 'correct') {
				newOrOldLevel = checkLevel(task.result, progress, tasks);
			}
			
			const strTasksArr = `subjects.${findSub}.tasks`;
			const ObjReq = {};
			ObjReq[strTasksArr] = task;
			
			await User.updateOne(
				{ login: userObj.user },
				{ $push: ObjReq }
			);
			
			if(newOrOldLevel === 'new level') {
				const strTasksArr = `subjects.${findSub}.progress`;
				const ObjReqLev = {};
				ObjReqLev[strTasksArr] = task.date;
				
				await User.updateOne(
					{ login: userObj.user },
					{ $push: ObjReqLev }
				);
				
				res.json({
					msg: "new level",
					level: progress.length + 1
				});
			} else {
				res.json({
					msg: "old level",
					level: progress.length
				});
			}
		} else {
			userUpdate.subjects.push(newSub);
			Object.assign(user, userUpdate);
			await user.save();
				
			res.json({
				msg: "old level",
				level: progress.length
			});
		}
	} else {
		userUpdate.subjects.push(newSub);
		Object.assign(user, userUpdate);
		
		await user.save();
			
		res.json({
			msg: "old level",
			level: 0
		});
	}
}

	
	
	
	
	
	

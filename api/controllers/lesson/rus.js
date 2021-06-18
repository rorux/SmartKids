const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const randomNum = (min, max) => Math.round(Math.random() * (max - min) + min);

const levelMap = [4, 9, 14, 14, 14, 14]; // количество правильных ответов (-1)

const checkLevel = (result, progress, tasks) => {
	const level = progress.length;
	const lastTasksArr = level => (level < 4) ? tasks.slice(-levelMap[level]) : tasks.slice(-14);
	const quantity = level => (level < 4) ? levelMap[level] : 14;
		
	if(lastTasksArr(level).every(el => (el.result === 'correct' && el.level === level)) && tasks.length >= quantity(level)) {
		return 'new level';
	} else {
		return 'old level';
	}
}

const taskMap = [
	// 0
	[
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'Летает по небу', 'пт_ц_'],
			answer: 'птица',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'Чем мы видим', 'гл_з_'],
			answer: 'глаза',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'Музыкальный инструмент', 'ги__р_'],
			answer: 'гитара',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'Герой мультика "Ну, погоди!"', 'в_л_'],
			answer: 'волк',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'Домашнее животное', 'к_шк_'],
			answer: 'кошка',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'Домашнее животное', 'с_б_к_'],
			answer: 'собака',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'Когда во время дождя гремит гром', 'г_оз_'],
			answer: 'гроза',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'После весны наступает', 'л__о'],
			answer: 'лето',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'Фрукт', 'яб__к_'],
			answer: 'яблоко',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'Ягода', 'чер__к_'],
			answer: 'черника',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'Горбатое животное', 'вер__ю_'],
			answer: 'верблюд',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'Кислый фрукт', 'ли_о_'],
			answer: 'лимон',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'Едет по дороге', 'м_ш_н_'],
			answer: 'машина',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'Растут на голове', 'в___сы'],
			answer: 'волосы',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'На нем сидят', 'с__л'],
			answer: 'стул',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'С нее катаются на площадке', 'г___а'],
			answer: 'горка',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'Им рисуют', 'ка___д_ш'],
			answer: 'карандаш',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'Их собирают в лесу', 'г__бы'],
			answer: 'грибы',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'Плывут по небу', 'об__ка'],
			answer: 'облака',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'Еда на завтрак', 'к_ш_'],
			answer: 'каша',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'Ягода', 'в_ш_я'],
			answer: 'вишня',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'В нем рисуют', 'ал__ом'],
			answer: 'альбом',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'Ей пишут', 'р_ч_а'],
			answer: 'ручка',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'В нее наливают чай', 'ч_ш_а'],
			answer: 'чашка',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'Растет на лужайке', 'т_а_в'],
			answer: 'трава',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'Зимой ее носят на голове', 'ш_п_а'],
			answer: 'шапка',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'Дает молоко', 'к_р_в_'],
			answer: 'корова',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'Переключает каналы на телевизоре', 'п___т'],
			answer: 'пульт',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'Завернута в фантик', 'к__ф_та'],
			answer: 'конфета',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'Ими мы слышим', 'у__'],
			answer: 'уши',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'Внучка Деда Мороза', 'с__гу__ч__'],
			answer: 'снегурочка',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'Её читают', 'к__г_'],
			answer: 'книга',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'В него складывают вещи', 'ш__ф'],
			answer: 'шкаф',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'Игрушка для девочек', 'ку_л_'],
			answer: 'кукла',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'Их надевают на ноги', 'но__и'],
			answer: 'носки',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'Её надевают перед сном', 'пи___а'],
			answer: 'пижама',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'Сказочный мальчик с длинным носом', 'бу____но'],
			answer: 'буратино',
			type: 'word'
		},
		{
			expression: ['Вставь пропущенные буквы и напиши слово целиком', 'Им укрываются, когда спят', 'о__я_о'],
			answer: 'одеяло',
			type: 'word'
		},
	],
	// 1 пустой (берутся задачи 0-го уровня)
	[],
	// 2
	[
		{
			expression: ['Отгадай загадку', 'Не огонь, а жжется'],
			answer: 'крапива',
			type: 'riddle'
		},
		{
			expression: ['Отгадай загадку', 'К нам приехали с бахчи полосатые мячи'],
			answer: 'арбуз',
			type: 'riddle'
		},
		{
			expression: ['Отгадай загадку', 'Раскаленная стрела дуб свалила у села'],
			answer: 'молния',
			type: 'riddle'
		},
		{
			expression: ['Отгадай загадку', 'Разноцветное коромысло над рекой повисло'],
			answer: 'радуга',
			type: 'riddle'
		},
		{
			expression: ['Отгадай загадку', 'Без окон без дверей полна горница людей'],
			answer: 'огурец',
			type: 'riddle'
		},
		{
			expression: ['Отгадай загадку', 'Без рук, а рисует, без зубов, а кусает'],
			answer: 'мороз',
			type: 'riddle'
		},
		{
			expression: ['Отгадай загадку', 'Семьдесят одежек и все без застежек'],
			answer: 'капуста',
			type: 'riddle'
		},
		{
			expression: ['Отгадай загадку', 'Стоял на крепкой ножке, теперь лежит в лукошке'],
			answer: 'гриб',
			type: 'riddle'
		},
		{
			expression: ['Отгадай загадку', 'Сидит дед, в шубу одет, кто его раздевает, тот слёзы проливает'],
			answer: 'лук',
			type: 'riddle'
		},
		{
			expression: ['Отгадай загадку', 'Этот фрукт на вкус хорош и на лампочку похож'],
			answer: 'груша',
			type: 'riddle'
		},
		{
			expression: ['Отгадай загадку', 'Маленький и горький, луку - брат'],
			answer: 'чеснок',
			type: 'riddle'
		},
		{
			expression: ['Отгадай загадку', 'По деревьям скок-скок, а орешки щёлк-щёлк'],
			answer: 'белка',
			type: 'riddle'
		},
		{
			expression: ['Отгадай загадку', 'Зверь я горбатый, а нравлюсь ребятам'],
			answer: 'верблюд',
			type: 'riddle'
		},
		{
			expression: ['Отгадай загадку', 'Выгнул спинку он дугой, замяукал. Кто такой?'],
			answer: 'кот',
			type: 'riddle'
		},
		{
			expression: ['Отгадай загадку', 'После осени пришла и сугробы намела'],
			answer: 'зима',
			type: 'riddle'
		},
		{
			expression: ['Отгадай загадку', 'Зимой лежал, весной побежал'],
			answer: 'снег',
			type: 'riddle'
		},
		{
			expression: ['Отгадай загадку', 'Где-то прячется в лесах очень хитрая…'],
			answer: 'лиса',
			type: 'riddle'
		},
		{
			expression: ['Отгадай загадку', 'Раньше всех встает, "Ку-ка-ре-ку!" поёт'],
			answer: 'петух',
			type: 'riddle'
		},
		{
			expression: ['Отгадай загадку', 'В неё наливают, из неё выпивают'],
			answer: 'чашка',
			type: 'riddle'
		},
		{
			expression: ['Отгадай загадку', 'Набита пухом, лежит под ухом'],
			answer: 'подушка',
			type: 'riddle'
		},
	],
	//3
	[
		{
			expression: ['Что изображено на картинке? (4 буквы)', '', '', 'https://rosokna-nk.ru/dataFiles/Okno_2.jpg'],
			answer: 'окно',
			type: 'pictures'
		},
		{
			expression: ['Что изображено на картинке? (6 букв)', '', '', 'https://cdn.pixabay.com/photo/2016/06/18/10/17/tree-1464727__480.jpg'],
			answer: 'дерево',
			type: 'pictures'
		},
		{
			expression: ['Что изображено на картинке? (7 букв)', '', '', 'https://frankfurt.apollo.olxcdn.com/v1/files/j67wwfipqsrs2-KZ/image;s=644x461'],
			answer: 'тарелка',
			type: 'pictures'
		},
		{
			expression: ['Что изображено на картинке? (5 букв)', '', '', 'https://stroygood.com/upload/iblock/2c9/2c9fe4846c47ba763f9731182efb180e.jpg'],
			answer: 'веник',
			type: 'pictures'
		},
		{
			expression: ['Что изображено на картинке? (3 буквы)', '', '', 'https://xn--35-6kchjxasfvhfz2f.xn--p1ai/wp-content/uploads/2019/02/dom-01.jpg'],
			answer: 'дом',
			type: 'pictures'
		},
		{
			expression: ['Что изображено на картинке? (6 букв)', '', '', 'https://m12.jp/wp-content/uploads/2015/07/yu83i.jpeg'],
			answer: 'камень',
			type: 'pictures'
		},
		{
			expression: ['Что изображено на картинке? (5 букв)', '', '', 'https://chistay-pobeda.ru/components/com_jshopping/files/img_products/full_____________________________________9_____________.jpg'],
			answer: 'ведро',
			type: 'pictures'
		},
		{
			expression: ['Что изображено на картинке? (5 букв)', '', '', 'https://www.moscowbooks.ru/image/book/701/w259/i701077.jpg'],
			answer: 'ручка',
			type: 'pictures'
		},
		{
			expression: ['Что изображено на картинке? (6 букв)', '', '', 'https://purepng.com/public/uploads/thumbnail/purepng.com-red-applesapplemalus-domesticafruitdeliciousred-apple-1701527152686etsae.png'],
			answer: 'яблоко',
			type: 'pictures'
		},
		{
			expression: ['Что изображено на картинке? (5 букв)', '', '', 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/151904549/original/3260d3d93f67ad02edd76fde4fc839a7393f6411/meme-edit-your-vids-xd.png'],
			answer: 'банан',
			type: 'pictures'
		},
		{
			expression: ['Что изображено на картинке? (7 букв)', '', '', 'https://user74272.clients-cdnnow.ru/wp-content/uploads/2020/06/205857_4695-1024x768.jpg'],
			answer: 'самолёт',
			type: 'pictures'
		}
	]
]

const taskGener = level => taskMap[level][randomNum(0, taskMap[level].length - 1)];

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
	const task = level => {
		if(level == 1) level = 0;
		if(level < 4) {
			return taskGener(level);
		} else {
			let newTaskLevel = randomNum(0,3);
			if(newTaskLevel == 1) newTaskLevel = 0;
			return taskGener(newTaskLevel)
		}
	}
	
	res.json({
		task: task(level)
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
	
	const sub = 'rus';
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
















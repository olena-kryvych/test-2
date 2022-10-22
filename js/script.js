let imgArray = new Array();

imgArray[0] = new Image();
imgArray[0].src = 'images/1 питання.jpg';

imgArray[1] = new Image();
imgArray[1].src = 'images/2 питання.jpg';

imgArray[2] = new Image();
imgArray[2].src = 'images/3 питання.jpg';

imgArray[3] = new Image();
imgArray[3].src = 'images/4 питання.png';

imgArray[4] = new Image();
imgArray[4].src = 'images/5 питання.png';

imgArray[5] = new Image();
imgArray[5].src = 'images/8.1.jpg';


const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

//Класс, который представляет сам тест
class Quiz
{
	constructor(type, questions, results)
	{
		//Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
		this.type = type;

		//Массив с вопросами
		this.questions = questions;

		//Массив с возможными результатами
		this.results = results;

		//Количество набранных очков
		this.score = 0;

		//Номер результата из массива
		this.result = 0;

		//Номер текущего вопроса
		this.current = 0;
	}

	Click(index)
	{
		//Добавляем очки
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		//Если было добавлено хотя одно очко, то считаем, что ответ верный
		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			//Иначе ищем, какой ответ может быть правильным
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}
		this.Next_img();
		this.Next();


		return correct;
	}

	//Переход к следующему вопросу

	
	Next_img() {
		let img = document.getElementById("mainImage");
		for (let i = 0; i < 5; i++) {
		  if (imgArray[i].src == img.src) {
			if (i === imgArray.length) {
			  document.getElementById("mainImage").src = imgArray[0].src;
			  break;
			} 
			document.getElementById("mainImage").src = imgArray[i + 1].src;
			break;
		  }
		}
	  }

	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}
	//Если вопросы кончились, этот метод проверит, какой результат получил пользователь
	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 

//Класс, представляющий вопрос
class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}

//Класс, представляющий ответ
class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}

//Класс, представляющий результат
class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	//Этот метод проверяет, достаточно ли очков набрал пользователь
	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}

//Массив с результатами
const results = 
[
	new Result("Вам багато чого потрібно дізнатися", 0),
	new Result("Ви вже непогано знаєтеся", 2),
	new Result("Ваш рівень вищий за середній", 4),
	new Result("Ви досконало знаєте тему", 5)
];

//Массив с вопросами
const questions = 
[
	new Question("Скільки років було Ван Гогу, коли він почав писати картини?", 
	[
		new Answer("10", 0),
		new Answer("17", 0),
		new Answer("39", 0),
		new Answer("27", 1)
	]),

	new Question("Де народився Вінсент Ван Гог?", 
	[
		new Answer("Арль, Франція", 0),
		new Answer("Антверпен, Бельгія", 0),
		new Answer("Париж, Франція", 0),
		new Answer("Грот-Зюндерт, Нідерланди", 1)
	]),

	new Question("Скільки братів і сестер було у Ван Гога?", 
	[
		new Answer("Один брат", 0),
		new Answer("Три брати та одна сестра", 0),
		new Answer("Два брати і три сестри", 1),
		new Answer("Два брата", 0)
	]),

	new Question("Ким встиг попрацювати Ван Гог, перш ніж повністю зануритися у живопис?", 
	[
		new Answer("Помічником пастора", 1),
		new Answer("Лікарем", 0),
		new Answer("Гувернером", 0),
		new Answer("Юристом", 0)
	]),

	new Question("Яка країна надихала Вінсента Ван Гога і вплинула на певний період у його творчості?", 
	[
		new Answer("США", 0),
		new Answer("Великобританія", 0),
		new Answer("Японія", 1),
		new Answer("Німеччина", 0)
	]),
	
];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update()
{
	//Проверяем, есть ли ещё вопросы
	if(quiz.current < quiz.questions.length) 
	{
		//Если есть, меняем вопрос в заголовке
		headElem.innerHTML = quiz.questions[quiz.current].text;

		//Удаляем старые варианты ответов
		buttonsElem.innerHTML = "";

		//Создаём кнопки для новых вариантов ответов
		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		
		//Выводим номер текущего вопроса
		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		//Вызываем функцию, которая прикрепит события к новым кнопкам
		Init();
	}
	else
	{
		//Если это конец, то выводим результат
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Кількість очок: " + quiz.score;
	}
}

function Init()
{
	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		//Прикрепляем событие для каждой отдельной кнопки
		//При нажатии на кнопку будет вызываться функция Click()
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{
	//Получаем номер правильного ответа
	let correct = quiz.Click(index);

	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	//Делаем кнопки серыми
	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	//Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{
		//Иначе просто подсвечиваем зелёным ответ пользователя
		btns[index].className = "button button_correct";
	}

	//Ждём секунду и обновляем тест
	setTimeout(Update, 1000);
}
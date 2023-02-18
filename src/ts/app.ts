import { editFirstCard, addNewEmptyCard } from "./cards.js";
import { addAgeOnTheLeft, addMonthOnTheTop } from './calendar.js';

document.addEventListener("submit", function(e) {
	e.preventDefault();
});

//------------------------------------Логика стартовой страницы-----------------------------------------
const btnStart = document.querySelector(".button_start") as HTMLButtonElement | null;;

const achivementsSection = document.querySelector(".achievements") as HTMLElement | null;
const resultSection = document.querySelector(".result")  as HTMLElement | null;
const buttonSaveCalendar = document.querySelector(".button_save_calendar") as HTMLButtonElement | null;

const inputBirthday = document.querySelector(".input_birthday") as HTMLInputElement | null;

let birthday : string;
const currentDate = new Date();

//Установка ограничения на дату др: могут пользоваться люди c 5 лет до 74 лет
let monthMaxMin = String(currentDate.getMonth() + 1);
monthMaxMin = monthMaxMin.length === 1 ? "0" + monthMaxMin : monthMaxMin;
inputBirthday.max = String(currentDate.getFullYear() - 5) + "-" + monthMaxMin;
inputBirthday.min = String(currentDate.getFullYear() - 74) + "-" + monthMaxMin;

btnStart.addEventListener("click", function(event) {
	birthday = inputBirthday.value;

	//Если дата дня рождения введена и она валидна, показываем секции работы с календарем
	if (birthday && birthday <= inputBirthday.max &&  birthday >= inputBirthday.min) {
		editFirstCard(birthday);

		achivementsSection.classList.remove("invisible");
		resultSection.classList.remove("invisible");
		buttonSaveCalendar.classList.remove("invisible");

		//И блокируем кнопку и input, чтобы нельзя было в процессе редактирования календаря менять дату рождения
		inputBirthday.disabled = true;
		btnStart.classList.add("button_start_confirmed");
		btnStart.classList.remove("button_start");
		btnStart.disabled = true;
		btnStart.style.transition = "1s all";
		btnStart.style.background = "#D9D9D9";

		//Плавная прокрутка до секции "Достижения"
		achivementsSection.scrollIntoView({behavior: "smooth"});

		//Подписывание месяцев и возраста в calendar
		addAgeOnTheLeft();
		addMonthOnTheTop(birthday);
		//Отрисовка прошлого в calendar
	} else {
		inputBirthday.style.borderColor = "#ff0000";
		inputBirthday.style.background = "#ffe5e5";
		setTimeout(() => {inputBirthday.style.borderColor = "#bdbdbd"; inputBirthday.style.background = "#ffffff"}, 1000);
	}
});
//------------------------------------------------------------------------------------------------------

//---------------------------------------Карточки-события-----------------------------------------------
const buttonAddNewCard = document.querySelector(".button_add_new_card");

buttonAddNewCard.addEventListener("click", function(e) {
	addNewEmptyCard(birthday);
});
//------------------------------------------------------------------------------------------------------


//-----------------------------------Сохранение канваса на компьютер------------------------------------
//отрисовка на канвас всех пометок
//затем открытие окна сохранения
//------------------------------------------------------------------------------------------------------
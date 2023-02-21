import { prepareFirstCard, addNewEmptyCard } from "./cards.js";
import { prepareCalendar } from './calendar.js';
import { showAwareFor } from "./help_functions.js";

document.addEventListener("submit", function(e) {
	e.preventDefault();
});

//------------------------------------Логика стартовой страницы-----------------------------------------
const btnStart = document.querySelector(".button_start") as HTMLButtonElement | null;;
const inputBirthday = document.querySelector(".input_birthday") as HTMLInputElement | null;

let birthday : string;
const currentDate = new Date();
setBirthdayDateRange();

btnStart.addEventListener("click", function(event) {
	birthday = inputBirthday.value;

	if (birthday && birthday <= inputBirthday.max &&  birthday >= inputBirthday.min) {
		fixBirthdayAndBtnStart();

		prepareFirstCard(birthday);
		prepareCalendar(birthday, currentDate);

		showAllSections();

		const eventsSection = document.querySelector(".events") as HTMLElement | null;
		eventsSection.scrollIntoView({behavior: "smooth"});		
	} else 
		showAwareFor(inputBirthday);
});

//-----------------------------------Добавление карточки-события----------------------------------------
const buttonAddNewCard = document.querySelector(".button_add_new_card");

buttonAddNewCard.addEventListener("click", function(e) {
	addNewEmptyCard(birthday);
});

//------------------------------Вспомогательные функции для первой страницы-----------------------------
function setBirthdayDateRange() {
	let monthMaxMin = String(currentDate.getMonth() + 1);
	monthMaxMin = monthMaxMin.length === 1 ? "0" + monthMaxMin : monthMaxMin;
	inputBirthday.max = String(currentDate.getFullYear() - 5) + "-" + monthMaxMin;
	inputBirthday.min = String(currentDate.getFullYear() - 76) + "-" + monthMaxMin; //74
}

function fixBirthdayAndBtnStart() {
	inputBirthday.disabled = true;
	btnStart.classList.add("button_start_confirmed");
	btnStart.classList.remove("button_start");
	btnStart.disabled = true;
}

function showAllSections() {
	const eventsSection = document.querySelector(".events") as HTMLElement | null;
	const resultSection = document.querySelector(".result")  as HTMLElement | null;
	eventsSection.classList.remove("invisible");
	resultSection.classList.remove("invisible");
}
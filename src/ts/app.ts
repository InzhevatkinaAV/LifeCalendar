//Импорт скрипта работы с событиями events
//Импорт скрипта работы с канвасом calendar

//------------------------------------Логика стартовой страницы-----------------------------------------
const btnStart = document.querySelector(".button_start") as HTMLButtonElement | null;;

const startScreenSection = document.querySelector(".start_screen");
const achivementsSection = document.querySelector(".achievements") as HTMLElement | null;
const resultSection = document.querySelector(".result")  as HTMLElement | null;
const buttonSaveCalendar = document.querySelector(".button_save_calendar") as HTMLButtonElement | null;

const inputBirthday = document.querySelector(".input_birthday") as HTMLInputElement | null;
const formBirthday = document.querySelector(".form_birthday");

let birthday : String;

formBirthday.addEventListener('submit', function(e) {
	e.preventDefault();
});

btnStart.addEventListener("click", function(event) {
	birthday = inputBirthday.value;

	//Если дата дня рождения введена, то показываем секции работы с календарем
	if (birthday) {
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
		//Отрисовка прошлого в calendar
	}
});
//------------------------------------------------------------------------------------------------------


//---------------------------------------Карточки-события-----------------------------------------------
//Массив из элементов типа Events

//Добавление новой карточки
// let btnNewCardAdd = document.querySelector("#btn_card-add");

// btnNewCardAdd.addEventListener("click", function(event) {

// });

//Подтверждение карточки, добавление ее в календарь (отрисовка на канвасе в 2х местах)
// let btnCardAddOnCalendar = document.querySelector("#btn_card-add-on-calendar");

// btnCardAddOnCalendar.addEventListener("click", function(event) {

// });

//Удаление карточки
// let btnCardRemove = document.querySelector("#btn_card-remove");

// btnCardRemove.addEventListener("click", function(event) {

// });
//------------------------------------------------------------------------------------------------------


//-----------------------------------Реализация слайдера карточек---------------------------------------
//кнопка влево и ее отображение только когда мы не долистали до 1го элемента
//кнопка вправо, когда есть более 2 элементов в слайдере и когда мы не долистали до крайнего правого элемента
//кружочки индикаторы внизу?
//------------------------------------------------------------------------------------------------------


//-----------------------------------Сохранение канваса на компьютер------------------------------------
//отрисовка на канвас всех пометок
//затем открытие окна сохранения
//------------------------------------------------------------------------------------------------------
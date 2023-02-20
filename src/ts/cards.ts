import { Event } from "./event.js";
import { addEventOnCalendar, deleteEventFromCalendar } from "./calendar.js";

const card = document.querySelector(".card");
const buttonAddNewCard = document.querySelector(".button_add_new_card") as HTMLButtonElement;

let eventsList = new Map<string, Event>();

export function editFirstCard(birthday : string) {
	let firstCardInputDate = document.querySelector(".input_month") as HTMLInputElement;

	let maxDate = new Date(new Date(birthday).getFullYear() + 74, new Date(birthday).getMonth() - 1);

	let monthMax = String(maxDate.getMonth() + 1);
	monthMax = monthMax.length === 1 ? "0" + monthMax : monthMax;

	firstCardInputDate.max = String(maxDate.getFullYear()) + "-" + monthMax;
	firstCardInputDate.min = birthday;
}

export function addNewEmptyCard(birthday : string) {
    let newCard = card.cloneNode(true) as HTMLElement;

	newCard.classList.remove("card_confirmed");
	newCard.style.background = "#ececec";

	if (!newCard.querySelector(".button_save_card")) {
		let btnWrapper = newCard.querySelector(".button_save-delete__wrapper") as HTMLElement;
		let btnSave = document.createElement("button");
		btnSave.classList.add("button_save_card");
		btnSave.innerHTML = "Запомнить";
		btnWrapper.prepend(btnSave);
	}

	let newCardInputTitle = newCard.querySelector(".input_title") as HTMLInputElement;
	newCardInputTitle.disabled = false;
	newCardInputTitle.value = "";
	newCardInputTitle.placeholder = "Еще одно воспоминание...или план?";

	let newCardInputDate = newCard.querySelector(".input_month") as HTMLInputElement;
	newCardInputDate.disabled = false;
	newCardInputDate.value = null;

	let monthMax = String(new Date(birthday).getMonth() + 1);
	monthMax = monthMax.length === 1 ? "0" + monthMax : monthMax;
	newCardInputDate.max = String(new Date(birthday).getFullYear() + 74) + "-" + monthMax;
	newCardInputDate.min = birthday;

	let newCardInputColor = newCard.querySelector(".input_color") as HTMLInputElement;
	newCardInputColor.disabled = false;
	newCardInputColor.style.cursor = "pointer";
	newCardInputColor.value = "#e66465";

	buttonAddNewCard.before(newCard);

	const cards = document.querySelectorAll('.card');
	let countAllCards = cards.length;
	console.log(countAllCards);

	if (countAllCards >= 33) buttonAddNewCard.style.display = 'none';
}

document.addEventListener("click", function(e){
    let element = isElement(".button_delete_card");
    if (element) {
        deleteCard(element.closest(".card"));
		element = null;
		return;
    }

	element = isElement(".button_save_card");
	if (element) {
		saveCard(element.closest(".card"));
		element = null;
		return;
	}
})

function isElement(className : string) {
    let element = (event.target as HTMLElement).closest(className);
	
	if (!element) {
		return;
	}
	
	return element;
}

function deleteCard(card : HTMLElement) {
	if (card.classList.contains("card_confirmed")) {
		let inputData = card.querySelector(".input_month") as HTMLInputElement;
		deleteEventFromCalendar(eventsList.get(inputData.value));
		eventsList.delete(inputData.value);
	}
    card.remove();

	buttonAddNewCard.style.display = '';
}

function saveCard(card : HTMLElement) {
	let inputData = card.querySelector(".input_month") as HTMLInputElement;
	let inputTitle = card.querySelector(".input_title") as HTMLInputElement;
	let inputColor = card.querySelector(".input_color") as HTMLInputElement;
	let btnSave = card.querySelector(".button_save_card") as HTMLButtonElement;

	if (inputTitle.value && inputData.value && inputData.value >= inputData.min && inputData.value <= inputData.max) {
		let newEvent = new Event(inputTitle.value, inputData.value, inputColor.value);

		if (!eventsList.has(newEvent.data)) {
			eventsList.set(newEvent.data, newEvent);
			card.classList.add("card_confirmed");
			card.style.background =  "#ffffff";
			inputData.disabled = true;
			inputTitle.disabled = true;
			inputColor.disabled = true;
			inputColor.style.cursor = "default";
			btnSave.remove();

			//Добавить на календарь событие
			addEventOnCalendar(newEvent);

		} else {
			alert("Эта дата уже занята");
		}
	} else {
		if (!inputTitle.value) {
			inputTitle.style.borderColor = "#ff0000";
			inputTitle.style.background = "#ffe5e5";
			setTimeout(() => {inputTitle.style.borderColor = "#bdbdbd"; inputTitle.style.background = "#ffffff"}, 1000);
		}
		if (!inputData.value || !(inputData.value >= inputData.min && inputData.value <= inputData.max)) {
			inputData.style.borderColor = "#ff0000";
			inputData.style.background = "#ffe5e5";
			setTimeout(() => {inputData.style.borderColor = "#bdbdbd"; inputData.style.background = "#ffffff"}, 1000);
		}
	}
}


import { Event } from './event.js';
import { addEventOnCalendar, deleteEventFromCalendar } from './calendar.js';
import { showAwareFor } from "./help_functions.js";

const firstCard = document.querySelector('.card') as HTMLElement;
const buttonAddNewCard = document.querySelector('.button_add_new_card') as HTMLButtonElement;

const eventsList = new Map<string, Event>();

export function prepareFirstCard(birthday : string) {
	const firstCardInputDate = document.querySelector('.input_month') as HTMLInputElement;
	setMinMaxInputDateOn(firstCardInputDate, birthday)
}

function setMinMaxInputDateOn(cardInputDate : HTMLInputElement, birthday : string) {
	const maxDate = new Date(new Date(birthday).getFullYear() + 76, new Date(birthday).getMonth() - 1);

	let monthMax = String(maxDate.getMonth() + 1);
	monthMax = monthMax.length === 1 ? '0' + monthMax : monthMax;

	cardInputDate.max = String(maxDate.getFullYear()) + '-' + monthMax;
	cardInputDate.min = birthday;
}

export function addNewEmptyCard(birthday : string) {
	const newCard = firstCard.cloneNode(true) as HTMLElement;

	newCard.classList.remove('card_confirmed');
	newCard.style.background = '$card_active_color';

	if (!newCard.querySelector('.button_save_card'))
		addSaveBtnOn(newCard);

	setInputTitleOn(newCard);
	setInputDateOn(newCard, birthday);
	setInputColorOn(newCard);

	buttonAddNewCard.before(newCard);

	const cards = document.querySelectorAll('.card');
	const countOfCards = cards.length;

	if (countOfCards >= 33) 
		buttonAddNewCard.style.display = 'none';
}

function addSaveBtnOn(newCard : HTMLElement) {
	const btnWrapper = newCard.querySelector('.button_save-delete__wrapper') as HTMLElement;
	const btnSave = document.createElement('button');
	btnSave.classList.add('button_save_card');
	btnSave.innerHTML = 'Запомнить';
	btnWrapper.prepend(btnSave);
}

function setInputTitleOn(newCard : HTMLElement) {
	const newCardInputTitle = newCard.querySelector('.input_title') as HTMLInputElement;
	newCardInputTitle.disabled = false;
	newCardInputTitle.value = '';
	newCardInputTitle.placeholder = 'Еще одно воспоминание, достижение...или план?';
}

function setInputDateOn(newCard : HTMLElement, birthday : string) {
	const newCardInputDate = newCard.querySelector('.input_month') as HTMLInputElement;
	newCardInputDate.disabled = false;
	newCardInputDate.value = null;
	setMinMaxInputDateOn(newCardInputDate, birthday);
}

function setInputColorOn(newCard : HTMLElement) {
	let newCardInputColor = newCard.querySelector('.input_color') as HTMLInputElement;
	newCardInputColor.disabled = false;
	newCardInputColor.style.cursor = 'pointer';
	newCardInputColor.value = '#29a725';

	newCardInputColor.style.backgroundColor = '#FFFFFF';
}

document.addEventListener('click', function(e){
	let element = isElement('.button_delete_card');
	if (element) {
		deleteCard(element.closest('.card'));
		element = null;
		return;
	}

	element = isElement('.button_save_card');
	if (element) {
		saveCard(element.closest('.card'));
		element = null;
		return;
	}
})

function isElement(className : string) {
	let element = (event.target as HTMLElement).closest(className);
	
	if (!element) return;
	
	return element;
}

function deleteCard(card : HTMLElement) {
	if (card.classList.contains('card_confirmed')) {
		const inputData = card.querySelector('.input_month') as HTMLInputElement;
		deleteEventFromCalendar(eventsList.get(inputData.value));
		eventsList.delete(inputData.value);
	}
	card.remove();

	buttonAddNewCard.style.display = '';
}

function saveCard(card : HTMLElement) {
	const inputData = card.querySelector('.input_month') as HTMLInputElement;
	const inputTitle = card.querySelector('.input_title') as HTMLInputElement;
	const inputColor = card.querySelector('.input_color') as HTMLInputElement;

	if (inputTitle.value && inputData.value && inputData.value >= inputData.min && inputData.value <= inputData.max) {
		const newEvent = new Event(inputTitle.value, inputData.value, inputColor.value);

		if (!eventsList.has(newEvent.data)) {
			eventsList.set(newEvent.data, newEvent);

			fixCard(card, inputData, inputTitle, inputColor);

			addEventOnCalendar(newEvent);

		} else {
			let title = eventsList.get(newEvent.data).title;
			alert(`Дата уже занята событием \"${title} \". \nНо Вы можете выбрать ближайший свободный месяц!`);
		}
		
	} else {
		if (!inputTitle.value)
			showAwareFor(inputTitle);
		if (!inputData.value || !(inputData.value >= inputData.min && inputData.value <= inputData.max))
			showAwareFor(inputData);
	}
}

function fixCard(card : HTMLElement, inputData : HTMLInputElement, inputTitle : HTMLInputElement, inputColor : HTMLInputElement) {
	card.classList.add('card_confirmed');

	inputData.disabled = true;
	inputTitle.disabled = true;
	inputColor.disabled = true;
	inputColor.style.backgroundColor = '#EEEEEE';
	inputColor.style.cursor = 'default';

	const btnSave = card.querySelector('.button_save_card') as HTMLButtonElement;
	btnSave.remove();
}
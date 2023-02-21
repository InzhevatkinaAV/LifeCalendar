import { Event } from './event.js';
import { addEventOnCalendar, deleteEventFromCalendar } from './calendar.js';
import { showAwareFor } from "./help_functions.js";
const firstCard = document.querySelector('.card');
const buttonAddNewCard = document.querySelector('.button_add_new_card');
const eventsList = new Map();
export function prepareFirstCard(birthday) {
    const firstCardInputDate = document.querySelector('.input_month');
    setMinMaxInputDateOn(firstCardInputDate, birthday);
}
function setMinMaxInputDateOn(firstCardInputDate, birthday) {
    const maxDate = new Date(new Date(birthday).getFullYear() + 76, new Date(birthday).getMonth() - 1);
    let monthMax = String(maxDate.getMonth() + 1);
    monthMax = monthMax.length === 1 ? '0' + monthMax : monthMax;
    firstCardInputDate.max = String(maxDate.getFullYear()) + '-' + monthMax;
    firstCardInputDate.min = birthday;
}
export function addNewEmptyCard(birthday) {
    const newCard = firstCard.cloneNode(true);
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
function addSaveBtnOn(newCard) {
    const btnWrapper = newCard.querySelector('.button_save-delete__wrapper');
    const btnSave = document.createElement('button');
    btnSave.classList.add('button_save_card');
    btnSave.innerHTML = 'Запомнить';
    btnWrapper.prepend(btnSave);
}
function setInputTitleOn(newCard) {
    const newCardInputTitle = newCard.querySelector('.input_title');
    newCardInputTitle.disabled = false;
    newCardInputTitle.value = '';
    newCardInputTitle.placeholder = 'Еще одно воспоминание...или план?';
}
function setInputDateOn(newCard, birthday) {
    const newCardInputDate = newCard.querySelector('.input_month');
    newCardInputDate.disabled = false;
    newCardInputDate.value = null;
    setMinMaxInputDateOn(newCardInputDate, birthday);
}
function setInputColorOn(newCard) {
    let newCardInputColor = newCard.querySelector('.input_color');
    newCardInputColor.disabled = false;
    newCardInputColor.style.cursor = 'pointer';
    newCardInputColor.value = '#29a725';
    newCardInputColor.style.backgroundColor = '#FFFFFF';
}
document.addEventListener('click', function (e) {
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
});
function isElement(className) {
    let element = event.target.closest(className);
    if (!element)
        return;
    return element;
}
function deleteCard(card) {
    if (card.classList.contains('card_confirmed')) {
        const inputData = card.querySelector('.input_month');
        deleteEventFromCalendar(eventsList.get(inputData.value));
        eventsList.delete(inputData.value);
    }
    card.remove();
    buttonAddNewCard.style.display = '';
}
function saveCard(card) {
    const inputData = card.querySelector('.input_month');
    const inputTitle = card.querySelector('.input_title');
    const inputColor = card.querySelector('.input_color');
    if (inputTitle.value && inputData.value && inputData.value >= inputData.min && inputData.value <= inputData.max) {
        const newEvent = new Event(inputTitle.value, inputData.value, inputColor.value);
        if (!eventsList.has(newEvent.data)) {
            eventsList.set(newEvent.data, newEvent);
            fixCard(card, inputData, inputTitle, inputColor);
            addEventOnCalendar(newEvent);
        }
        else
            alert('Эта дата уже занята');
    }
    else {
        if (!inputTitle.value)
            showAwareFor(inputTitle);
        if (!inputData.value || !(inputData.value >= inputData.min && inputData.value <= inputData.max))
            showAwareFor(inputData);
    }
}
function fixCard(card, inputData, inputTitle, inputColor) {
    card.classList.add('card_confirmed');
    inputData.disabled = true;
    inputTitle.disabled = true;
    inputColor.disabled = true;
    inputColor.style.backgroundColor = '#EEEEEE';
    inputColor.style.cursor = 'default';
    const btnSave = card.querySelector('.button_save_card');
    btnSave.remove();
}

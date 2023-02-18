import { Event } from "./event.js";
import { addEventOnCalendar, addEventOnDescription } from "./calendar.js";
const card = document.querySelector(".card");
const buttonAddNewCard = document.querySelector(".button_add_new_card");
let eventsList = new Map();
export function editFirstCard(birthday) {
    let firstCardInputDate = document.querySelector(".input_month");
    let monthMax = String(new Date(birthday).getMonth());
    monthMax = monthMax.length === 1 ? "0" + monthMax : monthMax;
    firstCardInputDate.max = String(new Date(birthday).getFullYear() + 75) + "-" + monthMax;
    firstCardInputDate.min = birthday;
}
export function addNewEmptyCard(birthday) {
    let newCard = card.cloneNode(true);
    newCard.classList.remove("card_confirmed");
    newCard.style.background = "#ececec";
    console.log(newCard.querySelector(".button_save_card"));
    if (!newCard.querySelector(".button_save_card")) {
        let btnWrapper = newCard.querySelector(".button_save-delete__wrapper");
        let btnSave = document.createElement("button");
        btnSave.classList.add("button_save_card");
        btnSave.innerHTML = "Запомнить";
        btnWrapper.prepend(btnSave);
    }
    let newCardInputTitle = newCard.querySelector(".input_title");
    newCardInputTitle.disabled = false;
    newCardInputTitle.value = "";
    newCardInputTitle.placeholder = "Еще одно воспоминание...";
    let newCardInputDate = newCard.querySelector(".input_month");
    newCardInputDate.disabled = false;
    newCardInputDate.value = null;
    let monthMax = String(new Date(birthday).getMonth());
    monthMax = monthMax.length === 1 ? "0" + monthMax : monthMax;
    newCardInputDate.max = String(new Date(birthday).getFullYear() + 75) + "-" + monthMax;
    newCardInputDate.min = birthday;
    let newCardInputColor = newCard.querySelector(".input_color");
    newCardInputColor.disabled = false;
    newCardInputColor.style.cursor = "pointer";
    newCardInputColor.value = "#e66465";
    buttonAddNewCard.before(newCard);
}
document.addEventListener("click", function (e) {
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
});
function isElement(className) {
    let element = event.target.closest(className);
    if (!element) {
        return;
    }
    return element;
}
function deleteCard(card) {
    if (card.classList.contains("card_confirmed")) {
        let inputData = card.querySelector(".input_month");
        eventsList.delete(inputData.value);
    }
    card.remove();
}
function saveCard(card) {
    let inputData = card.querySelector(".input_month");
    let inputTitle = card.querySelector(".input_title");
    let inputColor = card.querySelector(".input_color");
    let btnSave = card.querySelector(".button_save_card");
    if (inputTitle.value && inputData.value && inputData.value >= inputData.min && inputData.value <= inputData.max) {
        let newEvent = new Event(inputTitle.value, inputData.value, inputColor.value);
        if (!eventsList.has(newEvent.data)) {
            eventsList.set(newEvent.data, newEvent);
            card.classList.add("card_confirmed");
            card.style.background = "#ffffff";
            inputData.disabled = true;
            inputTitle.disabled = true;
            inputColor.disabled = true;
            inputColor.style.cursor = "default";
            btnSave.remove();
            addEventOnCalendar(newEvent);
            addEventOnDescription(newEvent);
        }
        else {
            alert("Эта дата уже занята");
        }
    }
    else {
        if (!inputTitle.value) {
            inputTitle.style.borderColor = "#ff0000";
            inputTitle.style.background = "#ffe5e5";
            setTimeout(() => { inputTitle.style.borderColor = "#bdbdbd"; inputTitle.style.background = "#ffffff"; }, 1000);
        }
        if (!inputData.value || !(inputData.value >= inputData.min && inputData.value <= inputData.max)) {
            inputData.style.borderColor = "#ff0000";
            inputData.style.background = "#ffe5e5";
            setTimeout(() => { inputData.style.borderColor = "#bdbdbd"; inputData.style.background = "#ffffff"; }, 1000);
        }
    }
}

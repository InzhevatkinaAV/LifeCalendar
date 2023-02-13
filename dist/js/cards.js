const card = document.querySelector(".card");
const buttonAddNewCard = document.querySelector(".button_add_new_card");
export function addNewEmptyCard() {
    let newCard = card.cloneNode(true);
    let newCardInputTitle = newCard.querySelector(".input_title");
    newCardInputTitle.value = "";
    newCardInputTitle.placeholder = "Новое воспоминание";
    let newCardInputDate = newCard.querySelector(".input_month");
    newCardInputDate.value = null;
    let newCardInputColor = newCard.querySelector(".input_color");
    newCardInputColor.value = "#e66465";
    buttonAddNewCard.before(newCard);
}
document.addEventListener("click", function (e) {
    let element = isElement(".button_delete_card");
    if (element) {
        deleteCard(element.closest(".card"));
    }
});
function isElement(str) {
    let element = event.target.closest(str);
    if (!element) {
        return;
    }
    return element;
}
function deleteCard(card) {
    card.remove();
}

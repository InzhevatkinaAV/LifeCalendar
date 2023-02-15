import { editFirstCard, addNewEmptyCard } from "./cards.js";
document.addEventListener("submit", function (e) {
    e.preventDefault();
});
const btnStart = document.querySelector(".button_start");
;
const achivementsSection = document.querySelector(".achievements");
const resultSection = document.querySelector(".result");
const buttonSaveCalendar = document.querySelector(".button_save_calendar");
const inputBirthday = document.querySelector(".input_birthday");
let birthday;
btnStart.addEventListener("click", function (event) {
    birthday = inputBirthday.value;
    if (birthday) {
        editFirstCard(birthday);
        achivementsSection.classList.remove("invisible");
        resultSection.classList.remove("invisible");
        buttonSaveCalendar.classList.remove("invisible");
        inputBirthday.disabled = true;
        btnStart.classList.add("button_start_confirmed");
        btnStart.classList.remove("button_start");
        btnStart.disabled = true;
        btnStart.style.transition = "1s all";
        btnStart.style.background = "#D9D9D9";
        achivementsSection.scrollIntoView({ behavior: "smooth" });
    }
});
const buttonAddNewCard = document.querySelector(".button_add_new_card");
buttonAddNewCard.addEventListener("click", function (e) {
    addNewEmptyCard(birthday);
});

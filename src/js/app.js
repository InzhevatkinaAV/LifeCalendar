import { editFirstCard, addNewEmptyCard } from "./cards.js";
import { addAgeOnTheLeft, addMonthOnTheTop } from './calendar.js';
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
const currentDate = new Date();
let monthMaxMin = String(currentDate.getMonth() + 1);
monthMaxMin = monthMaxMin.length === 1 ? "0" + monthMaxMin : monthMaxMin;
inputBirthday.max = String(currentDate.getFullYear() - 5) + "-" + monthMaxMin;
inputBirthday.min = String(currentDate.getFullYear() - 74) + "-" + monthMaxMin;
btnStart.addEventListener("click", function (event) {
    birthday = inputBirthday.value;
    if (birthday && birthday <= inputBirthday.max && birthday >= inputBirthday.min) {
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
        addAgeOnTheLeft();
        addMonthOnTheTop(birthday);
    }
    else {
        inputBirthday.style.borderColor = "#ff0000";
        inputBirthday.style.background = "#ffe5e5";
        setTimeout(() => { inputBirthday.style.borderColor = "#bdbdbd"; inputBirthday.style.background = "#ffffff"; }, 1000);
    }
});
const buttonAddNewCard = document.querySelector(".button_add_new_card");
buttonAddNewCard.addEventListener("click", function (e) {
    addNewEmptyCard(birthday);
});

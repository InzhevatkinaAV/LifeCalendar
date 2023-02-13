const btnStart = document.querySelector(".button_start");
;
const startScreenSection = document.querySelector(".start_screen");
const achivementsSection = document.querySelector(".achievements");
const resultSection = document.querySelector(".result");
const buttonSaveCalendar = document.querySelector(".button_save_calendar");
const inputBirthday = document.querySelector(".input_birthday");
const formBirthday = document.querySelector(".form_birthday");
let birthday;
formBirthday.addEventListener('submit', function (e) {
    e.preventDefault();
});
btnStart.addEventListener("click", function (event) {
    birthday = inputBirthday.value;
    if (birthday) {
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

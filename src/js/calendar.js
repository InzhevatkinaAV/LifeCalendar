import { Event } from "./event.js";
const calendarMonth = document.querySelector(".calendar");
let month = calendarMonth.children;
let birthdayDate;
const monthsNames = {
    '01': 'янв',
    '02': 'фев',
    '03': 'мар',
    '04': 'апр',
    '05': 'май',
    '06': 'июн',
    '07': 'июл',
    '08': 'авг',
    '09': 'сен',
    '10': 'окт',
    '11': 'ноя',
    '00': 'дек',
};
export function prepareCalendar(birthday, currentDate) {
    addBaseCells();
    addAgeOnTheLeft();
    addMonthOnTheTop(birthday);
    addPastOnCalendar(birthday, currentDate);
}
function addBaseCells() {
    for (let i = 0; i < 12 * 76; i++)
        calendarMonth.append(document.createElement('div'));
}
function addAgeOnTheLeft() {
    let count = 0;
    for (let i = 0; i < month.length; i++) {
        if (i % (24 + 1) == 0) {
            const age = document.createElement('p');
            age.classList.add('age');
            age.innerHTML = `${count}`;
            count += 2;
            month[i].before(age);
        }
    }
}
function addMonthOnTheTop(birthday) {
    let months = [];
    let startLife = (+(birthday.split('-')[1]) % 12).toString();
    startLife = startLife.length === 1 ? "0" + startLife : startLife;
    let curMonth = startLife;
    for (let i = 0; i < 12; i++) {
        months.push(monthsNames[curMonth]);
        curMonth = ((Number(curMonth) + 1) % 12).toString();
        curMonth = curMonth.length === 1 ? "0" + curMonth : curMonth;
    }
    months = months.concat(months);
    months.unshift('');
    for (let i = 0; i < months.length; i++) {
        const name = document.createElement('p');
        name.classList.add('months_names');
        name.innerHTML = `${months[i]}`;
        month[i].before(name);
    }
}
function addPastOnCalendar(birthday, currentDate) {
    birthdayDate = new Date(birthday);
    const presentDate = currentDate;
    const countOfYears = presentDate.getFullYear() - birthdayDate.getFullYear();
    const countMonths = presentDate.getMonth() - birthdayDate.getMonth() + countOfYears * 12;
    let pos = 26;
    for (let i = 0; i < countMonths; i++) {
        if (pos % 25 === 0)
            pos++;
        month[pos].classList.add('past');
        pos++;
    }
    addPastAndFutureOnDesignations();
}
function addPastAndFutureOnDesignations() {
    const pastPeriod = new Event("Хорошо знакомое прошлое", new Date().toString(), "#FFFFFF");
    addEventOnDesignations(pastPeriod, "past_designations");
    const futurePeriod = new Event("Еще не открытое будущее", new Date().toString(), " #EEEEEE");
    addEventOnDesignations(futurePeriod, "future_designations");
}
export function addEventOnCalendar(newEvent) {
    const countMonths = newEvent.countMonthFrom(birthdayDate);
    let pos = 26;
    for (let i = 0; i < countMonths; i++) {
        if (pos % 25 === 0)
            pos++;
        pos++;
    }
    if (pos % 25 === 0)
        pos++;
    month[pos].classList.add(`d${countMonths.toString()}`);
    const eventOnCalendar = document.querySelector(`.d${countMonths.toString()}`);
    eventOnCalendar.style.background = newEvent.color;
    addEventOnDesignations(newEvent, countMonths.toString());
}
function addEventOnDesignations(newEvent, countMonths) {
    const designationWrapper = document.querySelector('.designation__wrapper');
    const newDesignation = document.createElement('div');
    newDesignation.classList.add('designation', `d${countMonths}`);
    const newDesignationColor = document.createElement('div');
    newDesignationColor.classList.add('designation_color');
    newDesignationColor.style.background = newEvent.color;
    const newDesignationDescription = document.createElement('p');
    newDesignationDescription.classList.add('designation_description');
    newDesignationDescription.innerText = newEvent.title;
    newDesignation.append(newDesignationColor);
    newDesignation.append(newDesignationDescription);
    designationWrapper.append(newDesignation);
}
export function deleteEventFromCalendar(newEvent) {
    const countMonths = newEvent.countMonthFrom(birthdayDate);
    const eventOnCalendar = document.querySelector(`.d${countMonths.toString()}`);
    if (eventOnCalendar.classList.contains('past'))
        eventOnCalendar.style.background = "#FFFFFF";
    else
        eventOnCalendar.style.background = "#EEEEEE";
    eventOnCalendar.classList.remove(`d${countMonths.toString()}`);
    deleteEventFromDescription(countMonths.toString());
}
function deleteEventFromDescription(countMonths) {
    const designationWrapper = document.querySelector('.designation__wrapper');
    const oldEvent = designationWrapper.querySelector(`.d${countMonths}`);
    oldEvent.remove();
}

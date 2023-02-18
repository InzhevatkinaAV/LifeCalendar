const calendarMonth = document.querySelector(".calendar");
const month = calendarMonth.children;
let birthdayDate;
let presentDate;
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
export function addPastOnCalendar(birthday, currentDate) {
    birthdayDate = new Date(birthday);
    presentDate = currentDate;
    let countOfYears = presentDate.getFullYear() - birthdayDate.getFullYear();
    let countMonths = presentDate.getMonth() - birthdayDate.getMonth() + countOfYears * 12;
    let pos = 26;
    for (let i = 0; i < countMonths; i++) {
        if (pos % 25 === 0)
            pos++;
        month[pos].classList.add('past');
        pos++;
    }
    addPastOnDescription();
}
function addPastOnDescription() {
}
export function addEventOnCalendar(newEvent) {
    let newEventDate = new Date(newEvent.data);
    let countOfYears = newEventDate.getFullYear() - birthdayDate.getFullYear();
    let countMonths = newEventDate.getMonth() - birthdayDate.getMonth() - 1 + countOfYears * 12;
    let pos = 26;
    for (let i = 0; i < countMonths; i++) {
        if (pos % 25 === 0)
            pos++;
        pos++;
    }
    month[pos].classList.add(`d${countMonths.toString()}`);
    let eventOnCalendar = document.querySelector(`.d${countMonths.toString()}`);
    eventOnCalendar.style.background = newEvent.color;
    addEventOnDescription(newEvent);
}
function addEventOnDescription(newEvent) {
}
export function addAgeOnTheLeft() {
    let count = 0;
    for (let i = 0; i < month.length; i++) {
        if (i % (24 + 1) == 0) {
            let age = document.createElement('p');
            age.classList.add('age');
            age.innerHTML = `${count}`;
            count += 2;
            month[i].before(age);
        }
    }
}
export function addMonthOnTheTop(birthday) {
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
        let name = document.createElement('p');
        name.classList.add('months_names');
        name.innerHTML = `${months[i]}`;
        month[i].before(name);
    }
}

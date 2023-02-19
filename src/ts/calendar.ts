import { Event } from "./event.js";

const calendarMonth = document.querySelector(".calendar");
const month = calendarMonth.children;

let birthdayDate : Date;
let presentDate : Date;

const monthsNames = {
    '01' : 'янв',
    '02' : 'фев',
    '03' : 'мар',
    '04' : 'апр',
    '05' : 'май',
    '06' : 'июн',
    '07' : 'июл',
    '08' : 'авг',
    '09' : 'сен',
    '10' : 'окт',
    '11' : 'ноя',
    '00' : 'дек',
}

export function addPastOnCalendar(birthday : string, currentDate : Date) {
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
    //Справа от календаря добавить блок со списком событий. Для прошлого - это интервал от даты рождения до текущего месяца НЕ включительно
}

export function addEventOnCalendar(newEvent : Event) {
    let newEventDate = new Date(newEvent.data);
    
    let countOfYears = newEventDate.getFullYear() - birthdayDate.getFullYear();
    let countMonths = newEventDate.getMonth() - birthdayDate.getMonth() + countOfYears * 12;

    let pos = 26;

    for (let i = 0; i < countMonths; i++) {
        if (pos % 25 === 0)
            pos++;
        pos++;
    }

    if (pos % 25 === 0)
            pos++;
    
    if (pos > month.length)
        pos = month.length - 1;

    month[pos].classList.add(`d${countMonths.toString()}`);
    let eventOnCalendar = document.querySelector(`.d${countMonths.toString()}`) as HTMLElement;
    eventOnCalendar.style.background = newEvent.color;

	addEventOnDescription(newEvent, countMonths.toString());
}

function addEventOnDescription(newEvent : Event, countMonths : string) {
	let designationWrapper = document.querySelector('.designation__wrapper');

    let newDesignation = document.createElement('div');
    newDesignation.classList.add('designation', `d${countMonths}`);

    let newDesignationColor = document.createElement('div');
    newDesignationColor.classList.add('designation_color');
    newDesignationColor.style.background = newEvent.color;

    let newDesignationDescription = document.createElement('p');
    newDesignationDescription.classList.add('designation_description');
    newDesignationDescription.innerText = newEvent.title;

    newDesignation.append(newDesignationColor);
    newDesignation.append(newDesignationDescription);

    designationWrapper.append(newDesignation);
}

export function deleteEventFromCalendar(newEvent : Event) {
    let newEventDate = new Date(newEvent.data);
    
    let countOfYears = newEventDate.getFullYear() - birthdayDate.getFullYear();
    let countMonths = newEventDate.getMonth() - birthdayDate.getMonth() + countOfYears * 12;

    let eventOnCalendar = document.querySelector(`.d${countMonths.toString()}`) as HTMLElement;
    if (eventOnCalendar.classList.contains('past'))
        eventOnCalendar.style.background = "#b8ffcb";
    else
        eventOnCalendar.style.background = "#FFFFFF";

    eventOnCalendar.classList.remove(`d${countMonths.toString()}`);

    deleteEventFromDescription(countMonths.toString());
}

function deleteEventFromDescription(countMonths : string) {
    let designationWrapper = document.querySelector('.designation__wrapper');
    let oldEvent = designationWrapper.querySelector(`.d${countMonths}`);

    oldEvent.remove();
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

export function addMonthOnTheTop(birthday : string) {
    let months = [];

    let startLife : string = (+(birthday.split('-')[1]) % 12).toString();
    startLife = startLife.length === 1 ? "0" + startLife : startLife;
    let curMonth : string = startLife;

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
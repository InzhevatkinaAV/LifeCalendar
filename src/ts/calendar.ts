import { drawEventOnCalendar, drawEventDescription } from "./canvas.js";
import { Event } from "./event.js";

const calendarMonth = document.querySelector(".calendar");
const month = calendarMonth.childNodes;

export function addEventOnDescription(newEvent : Event) {
	
}

export function addEventOnCalendar(newEvent : Event) {
	
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

    let startLife : string = birthday.split('-')[1];
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

let monthsNames = {
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
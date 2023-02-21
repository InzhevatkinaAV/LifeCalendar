export class Event {
    constructor(title, data, color) {
        this.title = title;
        this.data = data;
        this.color = color;
    }
    countMonthFrom(birthdayDate) {
        const newEventDate = new Date(this.data);
        const countOfYears = newEventDate.getFullYear() - birthdayDate.getFullYear();
        const countMonths = newEventDate.getMonth() - birthdayDate.getMonth() + countOfYears * 12;
        return countMonths;
    }
}

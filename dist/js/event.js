export class Event {
    constructor(title, data, color) {
        this.title = title;
        this.data = data;
        this.color = color;
    }
    countMonthFrom(date) {
        const newEventDate = new Date(this.data);
        const countOfYears = newEventDate.getFullYear() - date.getFullYear();
        const countMonths = newEventDate.getMonth() - date.getMonth() + countOfYears * 12;
        return countMonths;
    }
}

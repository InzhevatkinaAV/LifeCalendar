export class Event {
	title : string;
	data : string;
	color : string;

	constructor(title : string, data : string, color : string) {
		this.title = title;
		this.data = data;
		this.color = color;
	}

	countMonthFrom(birthdayDate : Date) : number {
		const newEventDate : Date = new Date(this.data);
    
		const countOfYears : number = newEventDate.getFullYear() - birthdayDate.getFullYear();
		const countMonths : number = newEventDate.getMonth() - birthdayDate.getMonth() + countOfYears * 12;

		return countMonths;
	}
}
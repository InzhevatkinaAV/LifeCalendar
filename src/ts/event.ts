export class Event {
	title : string;
	data : string;
	color : string;

	constructor(title : string, data : string, color : string) {
		this.title = title;
		this.data = data;
		this.color = color;
	}

	countMonthFrom(date : Date) : number {
		const newEventDate : Date = new Date(this.data);
	
		const countOfYears : number = newEventDate.getFullYear() - date.getFullYear();
		const countMonths : number = newEventDate.getMonth() - date.getMonth() + countOfYears * 12;

		return countMonths;
	}
}
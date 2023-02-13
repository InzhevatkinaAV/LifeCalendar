class Events {
	name : string;
	month : number;
	year : number;
	color : string;
	confirm : boolean;

	constructor(name, month, year, color) {
		this.name = name;
		this.month = month;
		this.year = year;
		this.color = color;
		this.confirm = false;
	}

	setColor(color) {
		this.color = color;
	}

	setName(name) {
		this.name = name;
	}

	setData(month, year) {
		this.month = month;
		this.year = year;
	}

	confirmConfirm() {
		this.confirm = true;
	}

	addOnCalendar() {
		let canvas = document.querySelector('#canvas');


	}

	addDescription() {
		let canvas = document.querySelector('#canvas');
		
	}

}
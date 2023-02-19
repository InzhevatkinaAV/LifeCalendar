export class Event {
	title : string;
	data : string; //перевести в количество месяцев от др
	color : string;
	confirm : boolean;

	constructor(title : string, data : string, color : string) {
		this.title = title;
		this.data = data;
		this.color = color;
		this.confirm = false;
	}

	setColor(color : string) {
		this.color = color;
	}

	setName(title : string) {
		this.title = title;
	}

	setData(data : string) {
		this.data = data;
	}

	setConfirm(state : boolean) {
		this.confirm = state;
	}

	isEqual(data : Event) {
		if (this.data === data.data)
			return true;
		return false;
	}
}
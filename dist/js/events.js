export class Events {
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
    setConfirm(state) {
        this.confirm = state;
    }
}

export class Event {
    constructor(title, data, color) {
        this.title = title;
        this.data = data;
        this.color = color;
        this.confirm = false;
    }
    setColor(color) {
        this.color = color;
    }
    setName(title) {
        this.title = title;
    }
    setData(data) {
        this.data = data;
    }
    setConfirm(state) {
        this.confirm = state;
    }
    isEqual(data) {
        if (this.data === data.data)
            return true;
        return false;
    }
}

export default class Winner {
  name;
  time;
  constructor(_name, _time) {
    if (!_name || !_time) throw new Error("name and time cant be empty ");
    this.name = _name;
    this.time = _time;
  }

  toString() {
    return `name - ${this.name}, time - ${this.time}`;
  }

  toObject() {
    return {
      name: this.name,
      time: this.time,
    };
  }
}

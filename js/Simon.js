class Simon {
  constructor() {
    this.colors = ['green', 'red', 'yellow', 'blue'];
    this.pattern = [];
  }

  addToPattern() {
    let color = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.pattern.push(color);
  }
}

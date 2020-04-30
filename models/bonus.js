class AbstractBonus {
  constructor (hero, obj) {
    this.timeout = 15000;
    this.hero = hero;
    this.obj = obj
    this.reverseProxy = this.reverse.bind(this);
  }

  // stub for override
  getMessage() {
  }

  // stub for override
  apply() {
    setTimeout(this.reverseProxy, this.timeout);
  }

  // stub for override
  reverse() {
  }
}

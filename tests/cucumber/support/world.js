const { setWorldConstructor, World } = require('@cucumber/cucumber');
const { AmazonPageManager } = require('../../pages/amazon/AmazonPageManager');

class AmazonWorld extends World {
  constructor(options) {
    super(options);
    this.browser = null;
    this.context = null;
    this.page = null;
    this.pages = null;
  }

  async initPageManager() {
    this.pages = new AmazonPageManager(this.page);
  }
}

setWorldConstructor(AmazonWorld);

module.exports = { AmazonWorld };

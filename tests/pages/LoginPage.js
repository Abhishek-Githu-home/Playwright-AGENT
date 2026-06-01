class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator('#user-name');
    this.password = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]').first();
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(user, pass) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginButton.click();
  }

  async loginStandardUser() {
    await this.goto();
    await this.login('standard_user', 'secret_sauce');
  }

  async loginProblemUser() {
    await this.goto();
    await this.login('problem_user', 'secret_sauce');
  }

  async loginLockedOutUser() {
    await this.goto();
    await this.login('locked_out_user', 'secret_sauce');
  }

  async getErrorMessage() {
    return this.errorMessage;
  }
}
module.exports = {LoginPage}

import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class CompanySignupPage {
  constructor() {
    this.pageId = '#companySignup-page';
    this.pageSelector = Selector(this.pageId);
  }

  async signup(testController, username, password) {
    await testController.typeText('#signup-form-email', username);
    await testController.typeText('#signup-form-password', password);
    await testController.click('#signup-form-submit');
    await navBar.isLoggedIn(testController, username);
  }
}

export const companySignUp = new CompanySignupPage();

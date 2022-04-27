import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { signupPage } from './signup.page';
import { navBar } from './navbar.component';
import { companyHome } from './companyHome.page';
import { companySignUp } from './companySignup.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const newUser = { username: `user-${new Date().getTime()}@foo.com`, password: 'foo' };
const newCompany = { username: `user-${new Date().getTime()}@foo.com`, password: 'oof' };

fixture('Bowfolios localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signup page, then logout works', async (testController) => {
  // Create a new user email address that's guaranteed to be unique.
  await navBar.gotoSignupPage(testController);
  await signupPage.isDisplayed(testController);
  await signupPage.signupUser(testController, newUser.username, newUser.password);
  // New user has successfully logged in, so now let's logout.
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, newUser.username, newUser.password);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test.only('Test that company home page displays', async (testController) => {
  await navBar.gotoCompanySignupPage(testController);
  await companySignUp.signup(testController, newCompany.username, newCompany.password);
  await navBar.gotoCompanyHomePage(testController);
});

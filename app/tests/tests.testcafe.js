import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { signupPage } from './signup.page';
import { navBar } from './navbar.component';
import { companyHome } from './companyHome.page';
import { companySignUp } from './companySignup.page';
import { studentHomePage } from './home.page';
import { browseStudentsPage } from './browseStudents.page';
import { browseCompaniesPage } from './browseCompanies.page';
import { studentProfilePage } from './studentProfile.page';
import { companyProfilePage } from './companyProfile.page';
import { Students } from '../imports/api/students/Students';
import { Companies } from '../imports/api/companies/Companies';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const newUser = { username: `user-${new Date().getTime()}@foo.com`, password: 'foo' };
const newCompany = { username: `user-${new Date().getTime()}@company.com`, password: 'oof' };

fixture('Bowfolios localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signup page works, then logout works', async (testController) => {
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

test('Test that company home page displays', async (testController) => {
  await navBar.gotoCompanySignupPage(testController);
  await companySignUp.signup(testController, newCompany.username, newCompany.password);
  await navBar.gotoCompanyHomePage(testController);
  await companyHome.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that student home page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, newUser.username, newUser.password);
  await navBar.gotoStudentHomePage(testController);
  await studentHomePage.isDisplayed(testController);
  await studentHomePage.updateProfile(testController, newUser.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that browse student page displays when signed in and when the user is not signed in', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoBrowseStudentsPage(testController);
  await browseStudentsPage.hasDefaultProfiles(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, newCompany.username, newCompany.password);
  await navBar.gotoBrowseStudentsPage(testController);
  await browseStudentsPage.hasDefaultProfiles(testController);
});

test('Test that browse company page displays when signed in and when the user is not signed in', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoBrowseCompaniesPage(testController);
  await browseCompaniesPage.hasDefaultProfiles(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, newUser.username, newUser.password);
  await navBar.gotoBrowseCompaniesPage(testController);
  await browseStudentsPage.hasDefaultProfiles(testController);
});

test('Test that student profile page shows up', async (testController) => {
  const student = Students.collection.findOne(newUser.username);
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, newUser.username, newUser.password);
  await navBar.gotoBrowseStudentsPage(testController);
  await browseStudentsPage.clickOnStudent(testController, student._id);
  await studentProfilePage.isDisplayed(testController);
});

test('Test that company profile page shows up', async (testController) => {
  const company = Companies.collection.findOne(newCompany.username);
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, newUser.username, newUser.password);
  await navBar.gotoBrowseCompaniesPage(testController);
  await browseCompaniesPage.clickOnCompany(testController, company._id);
  await companyProfilePage.isDisplayed(testController);
});


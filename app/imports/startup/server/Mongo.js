import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Students } from '../../api/students/Students';
import { Companies } from '../../api/companies/Companies';

/* eslint-disable no-console */

/** Define a user in the Meteor accounts package. This enables login. Username is the email address. */
function createUser(email, role) {
  const userID = Accounts.createUser({ username: email, email, password: 'foo' });
  if (role === 'admin' || role === 'student' || role === 'company') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, role);
  }
}

/** Defines a new user and associated profile. Error if user already exists. */
function addStudent({ firstName, lastName, email, state, picture, description, role }) {
  console.log(`Defining profile ${email}`);
  createUser(email, 'student');
  Students.collection.insert({ firstName, lastName, email, state, picture, description });
}

/** Define a new project. Error ifproject already exists.  */
function addCompany({ name, homepage, email, description, picture, state, city }) {
  console.log(`Defining project ${name}`);
  Companies.collection.insert({ name, homepage, email, description, picture, state, city });
}

/** Initialize DB if it appears to be empty (i.e. no users defined.) */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultStudents && Meteor.settings.defaultCompanies) {
    console.log('Creating the default students');
    Meteor.settings.defaultStudents.map(profile => addStudent(profile));
    console.log('Creating the default companies');
    Meteor.settings.defaultCompanies.map(profile => addCompany(profile));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}

/**
 * If the loadAssetsFile field in settings.development.json is true, then load the data in private/data.json.
 * This approach allows you to initialize your system with large amounts of data.
 * Note that settings.development.json is limited to 64,000 characters.
 * We use the "Assets" capability in Meteor.
 * For more info on assets, see https://docs.meteor.com/api/assets.html
 * User count check is to make sure we don't load the file twice, which would generate errors due to duplicate info.
 */
if ((Meteor.settings.loadAssetsFile) && (Meteor.users.find().count() < 7)) {
  const assetsFileName = 'data.json';
  console.log(`Loading data from private/${assetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(assetsFileName));
  jsonData.profiles.map(profile => addProfile(profile));
  jsonData.projects.map(project => addProject(project));
}

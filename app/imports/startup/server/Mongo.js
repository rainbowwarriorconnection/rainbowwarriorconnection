import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Students } from '../../api/students/Students';
import { Companies } from '../../api/companies/Companies';
import { Interests } from '../../api/interests/Interests';
import { Jobs } from '../../api/jobs/Jobs';
import { CompanyJobs } from '../../api/jobs/CompanyJobs';

/* eslint-disable no-console */

/** Define a user in the Meteor accounts package. This enables login. Username is the email address. */

function createUser(email, password, role) {
  const userID = Accounts.createUser({ username: email, email, password: password });
  if (role === 'admin' || role === 'student' || role === 'company') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, role);
  }
}

/** Defines a new user and associated profile. Error if user already exists. */
function addStudent({ firstName, lastName, email, state, picture, description }) {
  console.log(`Defining profile ${email}`);
  createUser(email, 'student');
  Students.collection.insert({ firstName, lastName, email, state, picture, description });
}

/** Define a new project. Error ifproject already exists.  */
function addCompany({ name, homepage, email, description, picture, state, city }) {
  console.log(`Defining company ${name}`);
  createUser(email, 'company');
  Companies.collection.insert({ name, homepage, email, description, picture, state, city });
}

function addInterest({ name }) {
  console.log(`Defining interest ${name}`);
  Interests.collection.insert({ name });
}

function addJob({ jobId, jobTitle, description, salaryRange, state, city }) {
  console.log(`Defining job ${jobId}`);
  Jobs.collection.insert({ jobId, jobTitle, description, salaryRange, state, city });
}

function addCompanyJob({ companyName, jobId }) {
  console.log(`Connecting ${companyName} with ${jobId}`);
  CompanyJobs.collection.insert({ companyName, jobId });
}

function addAdmin({ email, password, role }) {
  // eslint-disable-next-line no-undef
  console.log(`Creating admin ${role}`);
  createUser(email, password, 'admin');
}

/** Initialize DB if it appears to be empty (i.e. no users defined.) */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default accounts');
    Meteor.settings.defaultAccounts.map(profile => addAdmin(profile));
  }
  if (Meteor.settings.defaultStudents && Meteor.settings.defaultCompanies) {
    console.log('Creating the default students');
    Meteor.settings.defaultStudents.map(profile => addStudent(profile));
    console.log('Creating the default companies');
    Meteor.settings.defaultCompanies.map(profile => addCompany(profile));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}

if(Interests.collection.find().count() == 0) {
    if(Meteor.settings.defaultInterests) {
        console.log("Creating the default interests");
	Meteor.settings.defaultInterests.map(interest => addInterest(interest));
    }
}

if(Jobs.collection.find().count() == 0) {
  if(Meteor.settings.defaultJobs) {
    console.log("Creating the default Jobs");
    Meteor.settings.defaultJobs.map(job => addJob(job));
  }
}

if(CompanyJobs.collection.find().count() == 0) {
  if(Meteor.settings.defaultCompanyJobs) {
    console.log("Creating the default Jobs");
    Meteor.settings.defaultCompanyJobs.map(companyjob => addCompanyJob(companyjob));
  }
}

/**
 * addProfile and addProject currently unimplemented to fix ESLint errors
 * @returns {undefined}
 */
function addProfile() {
  return undefined;
}

function addProject() {
  return undefined;
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

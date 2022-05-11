import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { _ } from 'meteor/underscore';
import { Students } from '../../api/students/Students';
import { Companies } from '../../api/companies/Companies';
import { CompanyJobs } from '../../api/jobs/CompanyJobs';
import { StudentsInterests } from '../../api/students/StudentsInterest';
import { Jobs } from '../../api/jobs/Jobs';

/**
 * In Bowfolios, insecure mode is enabled, so it is possible to update the server's Mongo database by making
 * changes to the client MiniMongo DB.
 *
 * However, updating the database via client-side calls can be inconvenient for two reasons:
 *   1. If we want to update multiple collections, we need to use nested callbacks in order to trap errors, leading to
 *      the dreaded "callback hell".
 *   2. For update and removal, we can only provide a docID as the selector on the client-side, making bulk deletes
 *      hard to do via nested callbacks.
 *
 * A simple solution to this is to use Meteor Methods (https://guide.meteor.com/methods.html). By defining and
 * calling a Meteor Method, we can specify code to be run on the server-side but invoked by clients. We don't need
 * to use callbacks, because any errors are thrown and sent back to the client. Also, the restrictions on the selectors
 * are removed for server-side code.
 *
 * Meteor Methods are commonly introduced as the necessary approach to updating the DB once the insecure package is
 * removed, and that is definitely true, but Bowfolios illustrates that they can simplify your code significantly
 * even when prototyping. It turns out that we can remove insecure mode if we want, as we use Meteor methods to update
 * the database.
 *
 * Note that it would be even better if each method was wrapped in a transaction so that the database would be rolled
 * back if any of the intermediate updates failed. Left as an exercise to the reader.
 */

const addStudentToRoleMethod = 'Roles.addStudentToRole';
Meteor.methods({
  'Roles.addStudentToRole'() {
    Roles.createRole('student', { unlessExists: true });
    Roles.addUsersToRoles(this.userId, 'student');
  },
});

const addCompanyToRoleMethod = 'Roles.addCompanyToRole';
Meteor.methods({
  'Roles.addCompanyToRole'() {
    Roles.createRole('company', { unlessExists: true });
    Roles.addUsersToRoles(this.userId, 'company');
  },
});

const updateCompaniesMethod = 'Companies.update';

/**
 * The server-side Profiles.update Meteor Method is called by the client-side Home page after pushing the update button.
 * Its purpose is to update the Profiles, ProfilesInterests, and ProfilesProjects collections to reflect the
 * updated situation specified by the user.
 */
Meteor.methods({
  'Companies.update'({ email, name, description, picture, state, city }) {
    Companies.collection.update({ email }, { $set: { email, name, description, picture, state, city } });
  },
});

const updateStudentsMethod = 'Students.update';

/**
 * The server-side Profiles.update Meteor Method is called by the client-side Home page after pushing the update button.
 * Its purpose is to update the Profiles, ProfilesInterests, and ProfilesProjects collections to reflect the
 * updated situation specified by the user.
 */
Meteor.methods({
  'Students.update'({ email, firstName, lastName, description, picture, state, interests, github }) {
    Students.collection.update({ email }, { $set: { email, firstName, lastName, description, picture, state, github } });

    StudentsInterests.collection.remove({ email });

    _.map(interests, function (interest) {
      StudentsInterests.collection.insert({ email, interest });
    });
  },
});

const addJobMethod = 'Jobs.add';

/** Creates a new job in the Jobs collection */
Meteor.methods({
  'Jobs.add'({ companyEmail, jobId,  jobTitle, description, salaryRange, city, state }) {
    Jobs.collection.insert({ jobTitle, description, salaryRange, city, state });
    CompanyJobs.collection.insert({ companyEmail, jobId });
  },
});

export { addCompanyToRoleMethod, addStudentToRoleMethod, updateStudentsMethod, updateCompaniesMethod, addJobMethod };

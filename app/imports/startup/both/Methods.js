import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Projects } from '../../api/projects/Projects';
/**
 * Unused imports
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
 * */
import { ProfilesProjects } from '../../api/profiles/ProfilesProjects';
import { ProjectsInterests } from '../../api/projects/ProjectsInterests';
import { Students } from '../../api/students/Students';
import { Companies } from '../../api/companies/Companies';
import { StudentsInterests} from '../../api/students/StudentsInterest';

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
  'Students.update'({ email, firstName, lastName, description, picture, state, interests }) {
    Students.collection.update({ email }, { $set: { email, firstName, lastName, description, picture, state } });
    _.map(interests, 
	 function(interest) { 
	    StudentsInterests.collection.insert({ email, interest }) 
	 }
    );
  },
});

const addProjectMethod = 'Projects.add';

/** Creates a new project in the Projects collection, and also updates ProfilesProjects and ProjectsInterests. */
Meteor.methods({
  'Projects.add'({ name, description, picture, interests, participants, homepage }) {
    Projects.collection.insert({ name, description, picture, homepage });
    ProfilesProjects.collection.remove({ project: name });
    ProjectsInterests.collection.remove({ project: name });
    if (interests) {
      interests.map((interest) => ProjectsInterests.collection.insert({ project: name, interest }));
    } else {
      throw new Meteor.Error('At least one interest is required.');
    }
    if (participants) {
      participants.map((participant) => ProfilesProjects.collection.insert({ project: name, profile: participant }));
    }
  },
});

export { addCompanyToRoleMethod, addStudentToRoleMethod, updateStudentsMethod, updateCompaniesMethod, addProjectMethod };

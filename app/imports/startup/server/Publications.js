import { Meteor } from 'meteor/meteor';
import { Students } from '../../api/students/Students';
import { Companies } from '../../api/companies/Companies';
import { StudentsInterests } from '../../api/students/StudentsInterest'
import { Interests } from '../../api/interests/Interests'

Meteor.publish(Students.userPublicationName, () => Students.collection.find());
Meteor.publish(Companies.userPublicationName, () => Companies.collection.find());
Meteor.publish(Interests.userPublicationName, () => Interests.collection.find());
Meteor.publish(StudentsInterests.userPublicationName, () => StudentsInterests.collection.find());

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

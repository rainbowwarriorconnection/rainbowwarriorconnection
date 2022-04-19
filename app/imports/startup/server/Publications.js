import { Meteor } from 'meteor/meteor';
import { Students } from '../../api/students/Students';
import { Companies } from '../../api/companies/Companies';

Meteor.publish(Students.userPublicationName, () => Students.collection.find());
Meteor.publish(Companies.userPublicationName, () => Companies.collection.find());

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

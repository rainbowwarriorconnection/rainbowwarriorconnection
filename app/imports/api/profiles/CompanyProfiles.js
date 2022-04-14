import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Encapsulates state and variable values for this collection. */
class CompanyProfilesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'CompanyProfilesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      companyName: { type: String, optional: true },
      email: { type: String, index: true, unique: true },
      state: { type: String, optional: true },
      city: { type: String, optional: true },
      picture: { type: String, optional: true },
      bio: { type: String, optional: true }
    }, { tracker: Tracker });
    // Ensure collection documents obey schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const StudentProfiles = new CompanyProfilesCollection();

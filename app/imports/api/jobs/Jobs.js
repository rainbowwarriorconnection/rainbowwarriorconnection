import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Encapsulates state and variable values for this collection. */
class JobsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'JobsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      jobId: { type: String, optional: true },
      jobTitle: { type: String, optional: true },
      description: { type: String, optional: true },
      salaryRange: { type: String, optional: true },
      state: { type: String, optional: true },
      city: { type: String, optional: true },
    }, { tracker: Tracker });
    // Ensure collection documents obey schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Jobs = new JobsCollection();

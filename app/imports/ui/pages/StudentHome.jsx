import React from 'react';
import { Grid, Segment, Header, Form, Loader } from 'semantic-ui-react';
import { AutoForm, TextField, LongTextField, SubmitField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Students } from '../../api/students/Students';
import { updateStudentsMethod } from '../../startup/both/Methods';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { StudentsInterests } from '../../api/students/StudentsInterest';
import { Interests } from '../../api/interests/Interests';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allInterests) => new SimpleSchema({
  email: { type: String, label: 'Email', optional: true },
  firstName: { type: String, label: 'First', optional: true },
  lastName: { type: String, label: 'Last', optional: true },
  description: { type: String, label: 'Biographical statement', optional: true },
  state: { type: String, label: 'State', optional: true },
  picture: { type: String, label: 'Picture URL', optional: true },
  interests: { type: Array, label: 'Interests', optional: true },
  'interests.$': { type: String, label: 'Interests', optional: true, allowedValues: allInterests },
});

/** Renders the Home Page: what appears after the user logs in. */
class StudentHome extends React.Component {
  /** On submit, insert the data. */
  submit(data) {
    console.log(data);
    Meteor.call(updateStudentsMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Profile updated successfully', 'success');
      }
    });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const email = Meteor.user().username;
    const allInterests = _.pluck(Interests.collection.find().fetch(), 'name');

    const formSchema = makeSchema(allInterests);
    const bridge = new SimpleSchema2Bridge(formSchema);
    // Now create the model with all the user information
    const student = Students.collection.findOne({ email });
    const model = _.extend({}, student);
    
    
    return (
      <Grid id="student-home-page" container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center" inverted>Your Student Profile</Header>
          <AutoForm model={model} schema={bridge} onSubmit={data => this.submit(data)}>
            <Segment>
              <Form.Group widths={'equal'}>
                <TextField id='firstName' name='firstName' showInlineError={true} placeholder={'First Name'}/>
                <TextField id='lastName' name='lastName' showInlineError={true} placeholder={'Last Name'}/>
                <TextField name='email' id='email' showInlineError={true} placeholder={'email'}/>
              </Form.Group>
              <Form.Group widths={'equal'}>
                <TextField name='state' id='state' showInlineError={true} placeholder={'State'}/>
              </Form.Group>
              <TextField name='picture' id='picture' showInlineError={true} placeholder={'URL for picture'}/>
              <LongTextField name='description' id='description' placeholder={'Description'}/>
	      <MultiSelectField name='interests' showInlineError={true} placeholder={'Interests'}/>
              <SubmitField id='student-home-submit' value='Submit'/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

StudentHome.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Students.userPublicationName);
  const sub2 = Meteor.subscribe(StudentsInterests.userPublicationName);
  const sub3 = Meteor.subscribe(Interests.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready(),
  };
})(StudentHome);

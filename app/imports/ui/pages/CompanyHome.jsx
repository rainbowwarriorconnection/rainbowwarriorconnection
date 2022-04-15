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
import { Interests } from '../../api/interests/Interests';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesProjects } from '../../api/profiles/ProfilesProjects';
import { Projects } from '../../api/projects/Projects';
import { updateProfileMethod } from '../../startup/both/Methods';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allInterests, allProjects) => new SimpleSchema({
  email: { type: String, label: 'Email', optional: true },
  name: { type: String, label: 'Company', optional: true },
  description: { type: String, label: 'Biography', optional: true },
  state: { type: String, label: 'State', optional: true },
  city: { type: String, label: 'City', optional: true },
  picture: { type: String, label: 'Picture URL', optional: true },
});

/** Renders the Home Page: what appears after the user logs in. */
class CompanyHome extends React.Component {

  /** On submit, insert the data. */
  submit(data) {
    Meteor.call(updateProfileMethod, data, (error) => {
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
    // Create the form schema for uniforms. Need to determine all interests and projects for muliselect list.
    const formSchema = makeSchema(allInterests, allProjects);
    const bridge = new SimpleSchema2Bridge(formSchema);
    // Now create the model with all the company information.
    const profile = Profiles.collection.findOne({ email });
    const model = _.extend({}, profile, { interests, projects });
    return (
      <Grid id="home-page" container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Your Company Profile</Header>
          <AutoForm model={model} schema={bridge} onSubmit={data => this.submit(data)}>
            <Segment>
              <Form.Group widths={'equal'}>
                <TextField name='companyName' showInlineError={true} placeholder={'Company Name'}/>
                <TextField name='state' showInlineError={true} placeholder={'State'}/>
                <TextField name='city' showInlineError={true} placeholder={'City'}/>
              </Form.Group>
              <Form.Group widths={'equal'}>
                <TextField name='email' showInlineError={true} placeholder={'Email'}/>
                <TextField name='picture' showInlineError={true} placeholder={'Provide a link for your Company Logo'}/>
              </Form.Group>
              <Form.Group widths={'equal'}>
                <LongTextField name='description' showInlineError={true} placeholder={'Company Description'}/>
              </Form.Group>
              <SubmitField id='home-page-submit' value='Submit'/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

CompanyHome.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Companies.userPublicationName);
  return {
    ready: sub1.ready(),
  };
})(CompanyHome);

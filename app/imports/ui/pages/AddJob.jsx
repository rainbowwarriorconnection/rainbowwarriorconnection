import React from 'react';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
import { AutoForm, TextField, LongTextField, SubmitField, ErrorsField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import { addJobMethod } from '../../startup/both/Methods';
import { Companies } from '../../api/companies/Companies';

SimpleSchema.debug = true;

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = () => new SimpleSchema({
  jobTitle: { type: String, label: 'Job Title', optional: true },
  description: { type: String, label: 'Description', optional: true },
  city: { type: String, label: 'City', optional: true },
  state: { type: String, label: 'State', optional: true },
  salaryRange: { type: String, label: 'Salary Range', optional: true },
});

/** Renders the Page for adding a document. */
class AddJob extends React.Component {
  /** On submit, insert the data. */
  submit(data, formRef) {
    console.log(data);
    Meteor.call(addJobMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Project added successfully', 'success').then(() => formRef.reset());
      }
    });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    const formSchema = makeSchema();
    const bridge = new SimpleSchema2Bridge(formSchema);
    const email = Meteor.user().username;
    const company = Companies.collection.findOne({ email });
    return (
      <Grid id="add-job-page" container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center" inverted>Add Job Posting</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(_.extend({companyName: company.name, jobId: `${company.name}-${data.jobTitle}`}, data), fRef)}>
            <Segment>
              <Form.Group widths={'equal'}>
                <TextField name='jobTitle' showInlineError={true} placeholder='Job Title'/>
                <TextField name='city' showInlineError={true} placeholder='City'/>
                <TextField name='state' showInlineError={true} placeholder='State'/>
              </Form.Group>
              <LongTextField name='description' placeholder='Describe the job here'/>
              <Form.Group widths={'equal'}>
                <TextField name='salaryRange' showInlineError={true} placeholder={'Salary Range'}/>
              </Form.Group>
              <SubmitField id='submit' name='submit' value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

AddJob.propTypes = {
  ready: PropTypes.bool.isRequired,
  company: PropTypes.object,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Companies.userPublicationName);
  const ready = sub1.ready();
  return {
    ready,
  };
})(AddJob);

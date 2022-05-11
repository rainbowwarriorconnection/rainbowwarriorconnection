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

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = () => new SimpleSchema({
  jobTitle: String,
  description: String,
  city: String,
  state: String,
  salaryRange: String,
});

/** Renders the Page for adding a document. */
class AddJob extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const jobData = _.extend({ companyEmail: this.company.props.email, jobId: `${this.company.props.name}-${data.jobTitle}` }, data);
    console.log(jobData);
    Meteor.call(addJobMethod, jobData, (error) => {
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
    return (
      <Grid id="add-job-page" container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center" inverted>Add Job Posting</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <Form.Group widths={'equal'}>
                <TextField id='jobTitle' name='jobTitle' showInlineError={true} placeholder='Job Title'/>
                <TextField id='city' name='city' showInlineError={true} placeholder='City'/>
                <TextField id='state' name='state' showInlineError={true} placeholder='State'/>
              </Form.Group>
              <LongTextField id='description' name='description' placeholder='Describe the job here'/>
              <Form.Group widths={'equal'}>
                <TextField id='salaryRange' name='salaryRange' showInlineError={true} placeholder={'Salary Range'}/>
              </Form.Group>
              <SubmitField id='submit' value='Submit'/>
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
export default withTracker(({ match }) => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const documentId = match.params._id;
  const sub1 = Meteor.subscribe(Companies.userPublicationName);
  const ready = sub1.ready();
  const company = Companies.collection.findOne(documentId);
  return {
    ready,
    company,
  };
})(AddJob);

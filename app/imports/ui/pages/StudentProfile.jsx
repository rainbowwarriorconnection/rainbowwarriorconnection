import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Header, Grid, Segment } from 'semantic-ui-react';
import { AutoForm, TextField } from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Students } from '../../api/students/Students.js';

const bridge = new SimpleSchema2Bridge(Students.schema);

/** Renders the Profile Collection as a set of Cards. */
class StudentProfile extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
      <Container id="student-profiles-page">
        <Header>{this.props.doc.firstName}</Header>
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Edit Contacts</Header>
            <AutoForm schema={bridge} model={this.props.doc}>
              <Segment>
                <TextField name='firstName'/>
                <TextField name='lastName'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

StudentProfile.propTypes = {
  ready: PropTypes.bool.isRequired,
  doc: PropTypes.object,
  model: PropTypes.object,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const sub1 = Meteor.subscribe(Students.userPublicationName);
  const ready = sub1.ready();
  const doc = Students.collection.findOne(documentId);

  return {
    ready,
    doc,
  };
})(StudentProfile);

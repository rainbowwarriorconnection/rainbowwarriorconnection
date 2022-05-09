import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Header, Grid, Image, Label } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Students } from '../../api/students/Students.js';
import { StudentsInterests } from '../../api/students/StudentsInterest';

/** Renders the Profile Collection as a set of Cards. */
class StudentProfile extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const email = this.props.student.email;
    const studentInterests = _.pluck(StudentsInterests.collection.find({ email }).fetch(), 'interest');
    return (
      <Container id="student-profile-page">
        <Container className='student-profile-page-grids'>
          <Grid verticalAlign='middle' textAlign='center'>
            <Grid.Column width={4}>
              <Image size='small' circular src={this.props.student.picture}/>
            </Grid.Column>
            <Grid.Column width={8}>
              <Header as='h1' inverted>{this.props.student.firstName} {this.props.student.lastName}</Header>
            </Grid.Column>
          </Grid>
        </Container>
        <Container className='student-profile-page-grids' verticalAlign='top'>
          <Grid columns={2}>
            <Grid.Column className='student-profile-page-border'>
              <Header as='h2' inverted>Skills: </Header>
              {_.map(studentInterests, (interests, index) => <Label size='big'
                className='student-profile-page-interests-label' key={index}>{interests}</Label>)}
            </Grid.Column>
            <Grid.Column className='student-profile-page-border'>
              <Header as='h2' inverted>Location Preference: </Header>
              <Header as='h3' inverted textAlign='center'>
                {this.props.student.state}
              </Header>
            </Grid.Column>
          </Grid>
        </Container>
        <Container className='student-profile-page-border'>
          <Header as='h2' inverted> Description</Header>
          <Header as='h5' inverted>{this.props.student.description}</Header>
        </Container>
      </Container>
    );
  }
}

StudentProfile.propTypes = {
  ready: PropTypes.bool.isRequired,
  student: PropTypes.object,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const sub1 = Meteor.subscribe(Students.userPublicationName);
  const sub2 = Meteor.subscribe(StudentsInterests.userPublicationName);
  const ready = sub1.ready() && sub2.ready();
  const student = Students.collection.findOne(documentId);

  return {
    ready,
    student,
  };
})(StudentProfile);

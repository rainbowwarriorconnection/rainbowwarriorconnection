import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Segment, Icon, Divider, Container, Loader, Header, Grid, Image, Label, Message } from 'semantic-ui-react';
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
          <Grid centered columns={2} >
            <Grid.Column width={4}>
              <Image size='medium' src={this.props.student.picture}/>
              <Header as='h1' inverted> 
	    		<a href={'https://github.com/'+this.props.student.github}><Icon inverted name='github'/></a> 
	    		{this.props.student.firstName} {this.props.student.lastName}
	      </Header>
            </Grid.Column>
	    <Grid.Column width={8}>
	      <Grid.Row>
	          <Grid columns='equal'>
	          <Grid.Column width={8}>
                      <Header inverted as='h3' >
	                  <Icon inverted name='book'/>
	                  Skills
	              </Header>
	              {_.map(studentInterests, (interests, index) => <Label size='mini'
			      className='student-profile-page-interests-label' key={index}>{interests}</Label>)}
	          </Grid.Column>
	          </Grid>
	      </Grid.Row>
	      <Divider/>
	      <Grid.Row>
	          <Grid columns={2}>
                     <Grid.Column>
                        <Header as='h3' inverted><div><Icon name='map'/>Location Preference</div></Header> 
	             </Grid.Column>
	             <Grid.Column>
                         <Header as='h4' inverted>
                             {this.props.student.state}
                         </Header>
	              </Grid.Column>
	          </Grid>
	      </Grid.Row>
	      <Divider/>
	      <Grid.Row>
                  <Header as='h3' inverted>
	             <div>
                <Icon name='terminal' size='small'/> 
	             Bio 
	             </div>
	          </Header>
                  <Header as='h4' inverted>{this.props.student.description}</Header>
	      </Grid.Row>
	    </Grid.Column>
          </Grid>
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

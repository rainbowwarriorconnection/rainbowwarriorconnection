import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Students } from '../../api/students/Students';
import { StudentsInterests } from '../../api/students/StudentsInterest';
import { Interests } from '../../api/interests/Interests';
import FilterBar from '../components/FilterBar';
import MakeCard from '../components/MakeCard';

/** Returns the Profile and associated Projects and Interests associated with the passed user email. */
function getProfileData(email) {
  const data = Students.collection.findOne({ email });
  const interests = _.pluck(StudentsInterests.collection.find({ email }).fetch(), 'interest');
  return _.extend({ }, data, { interests: interests });
}

/** Renders the Profile Collection as a set of Cards. */
class ProfilesPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filterType: 'search',
      filterValue: '',
    };
  }
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  onFilter = (filterType, val) => {
    this.setState({
      filterType: filterType,
      filterValue: val,
    });
  }

  renderCard(profile, index) {
    const val = this.state.filterValue;
    if (!val) {
      return <MakeCard id={'studentCard'} key={index} profile={profile}/>;
    }
    if (this.state.filterType === 'search') {
      const fullName = `${profile.firstName.toUpperCase()} ${profile.lastName.toUpperCase()}`;
      return (fullName.indexOf(val.toUpperCase()) > -1) ? <MakeCard key={index} profile={profile}/> : '';
    } if (this.state.filterType === 'interests') {
      return (profile.interests.includes(val)) ? <MakeCard key={index} profile={profile}/> : '';
    }
    return <MakeCard key={index} profile={profile}/>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const emails = _.pluck(Students.collection.find().fetch(), 'email');
    const studentData = emails.map(email => getProfileData(email));
    const interests = _.pluck(Interests.collection.find().fetch(), 'name');
    return (
      <Container id='browse-students-page'>
        <FilterBar onFilter={this.onFilter} interests={interests} className="filter-format"/>
        <Card.Group className="card-format" centered>
          {_.map(studentData, (profile, index) => this.renderCard(profile, index))}
        </Card.Group>
      </Container>
    );
  }
}

ProfilesPage.propTypes = {
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
})(ProfilesPage);

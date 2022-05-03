import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Image, Modal, Button, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Companies } from '../../api/companies/Companies';

function setOpen(input) {
  this.modalState = input;
}

/** Gets the Project data as well as Profiles and Interests associated with the passed Project name. */
function getCompanyData(name) {
  const data = Companies.collection.findOne({ name });
  return _.extend({ }, data);
}

/** Component for layout out a Project Card. */
const MakeCard = (props) => (
  <Card>
    <Card.Content>
      <Image floated='left' avatar src={props.project.picture}/>
      <Card.Header style={{ marginTop: '0px' }}>{props.project.name}</Card.Header>
      <Card.Meta>
        <span className='city'>{props.project.city}, { props.project.state} </span>
      </Card.Meta>
      <Card.Description>
        { props.project.description }
      </Card.Description>
    </Card.Content>
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={this.modalState}
      trigger={<Button>Show Modal</Button>}
    >
      <Modal.Header>Select a Photo</Modal.Header>
      <Modal.Content image>
        <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped/>
        <Modal.Description>
          <Header>Default Profile Image</Header>
          <p>
            We have found the following gravatar image associated with your e-mail
            address.
          </p>
          <p>Is it okay to use this photo?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Button
          content="Yep, that's me"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  </Card>
);

MakeCard.propTypes = {
  project: PropTypes.object.isRequired,
};

/** Renders the Project Collection as a set of Cards. */
class CompaniesPage extends React.Component {
  modalState;

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const companies = _.pluck(Companies.collection.find().fetch(), 'name');
    const companyData = companies.map(company => getCompanyData(company));
    return (
      <Container id="company-profiles-page">
        <Card.Group centered>
          {_.map(companyData, (company, index) => <MakeCard key={index} project={company}/>)}
        </Card.Group>
      </Container>
    );
  }
}

CompaniesPage.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Companies.userPublicationName);
  return {
    ready: sub1.ready(),
  };
})(CompaniesPage);

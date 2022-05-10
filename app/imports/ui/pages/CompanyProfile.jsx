import React from 'react';
import { Grid, Loader, Image, Header, Container } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Companies } from '../../api/companies/Companies.js';

/** Renders the Home Page: what appears after the user logs in. */
class CompanyProfile extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    /** Get company information and create model */
    return (
      <Container id="company-profile-page">
        <Container className='company-profile-page-grids'>
          <Grid verticalAlign='middle' textAlign='center'>
            <Grid.Column width={4}>
              <Image size='small' circular src={this.props.company.picture}/>
            </Grid.Column>
            <Grid.Column width={8}>
              <Header as='h1' inverted>{this.props.company.name}</Header>
            </Grid.Column>
          </Grid>
        </Container>
        <Container className='company-profile-page-border'>
          <Header as='h3' inverted>{this.props.company.description}</Header>
        </Container>
        <Container className='company-profile-page-grids'>
          <Grid columns={2}>
            <Grid.Column className='company-profile-page-border'>
              <Header as='h3' inverted>Location: {this.props.company.city}, {this.props.company.state} </Header>
              <Header as='h3' inverted>Contact us: {this.props.company.email}</Header>
              <Header href={'{this.props.company.homepage}'} as='h3' inverted>{this.props.company.homepage}</Header>
            </Grid.Column>
            <Grid.Column className='company-profile-page-border'>
              <Header as='h3' inverted>Available Positions: </Header>
              <Header as='h3' inverted textAlign='center'> jobs here
              </Header>
            </Grid.Column>
          </Grid>
        </Container>
      </Container>
    );
  }
}

CompanyProfile.propTypes = {
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
})(CompanyProfile);

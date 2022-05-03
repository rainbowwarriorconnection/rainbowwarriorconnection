import React from 'react';
import { Grid, Loader, Image, Header, Container, Route } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
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
    const email = Meteor.user().username;
    const company = Companies.collection.findOne({ email });
    const model = _.extend({}, company);
    return (
      <Grid id="companyProfile-page" style={{ background: 'white' }} celled>
        <Grid.Column width={9}>
          <Grid container>
            <Grid.Row>
              <Grid.Column width={4}>
                <Image src={model.picture} style={{ width: '200px' }} ></Image>
              </Grid.Column>
              <Grid.Column width={4}>
                <Header as='h1'>{model.name}</Header>
                <Container>{model.city}, {model.state}</Container>
                <Container>{model.homepage}</Container>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Container>{model.description}</Container>
            </Grid.Row>
          </Grid>
        </Grid.Column>
        <Grid.Column>
          Jobs
        </Grid.Column>
      </Grid>
    );
  }
}

CompanyProfile.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Companies.userPublicationName);
  return {
    ready: sub1.ready(),
  };
})(CompanyProfile);

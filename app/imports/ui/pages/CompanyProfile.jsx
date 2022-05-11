import React from 'react';
import { Segment, Icon, Grid, Divider, Loader, Image, Header, Container } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Companies } from '../../api/companies/Companies.js';
import { Jobs } from '../../api/jobs/Jobs';
import { CompanyJobs } from '../../api/jobs/CompanyJobs';
import MakeJobCard from '../components/MakeJobCard';

/** Renders the Home Page: what appears after the user logs in. */
class CompanyProfile extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    /** Get company information and create model */
    const name = this.props.company.name;
    const companyJobIds = _.pluck(CompanyJobs.collection.find({ companyName: name }).fetch(), 'jobId');
    const companyJobs = _.map(companyJobIds, function (id) { return _.findWhere(Jobs.collection.find().fetch(), { jobId: id }); });
    console.log(companyJobs);
    return (
      <Container id="company-profile-page">
        <Grid centered columns={2} >
          <Grid.Column centered textAlign='center' width={4}>
            <Header as='h1' inverted>{this.props.company.name}</Header>
            <Image size='small' centered circular src={this.props.company.picture}/>
          </Grid.Column>
          <Grid.Column width={8}>
            <Grid columns={2}>
              <Grid.Column>
                <Header as='h3' inverted> <Icon name='map' size='mini'/>Location</Header>
              </Grid.Column>
              <Grid.Column>
                <Header as='h4' inverted>{this.props.company.city}, {this.props.company.state}
                </Header>
              </Grid.Column>
            </Grid>
            <Grid columns={2}>
              <Grid.Column>
                <Header as='h3' inverted>
                  <Icon inverted name='mail' size='small'/>Contact us</Header>
              </Grid.Column>
              <Grid.Column>
                <Header as='h4' inverted>{this.props.company.email}</Header>
              </Grid.Column>
            </Grid>
            <Grid columns={2}>
              <Grid.Column>
                <Header as='h3' inverted><Icon inverted name='world'/>Homepage</Header>
              </Grid.Column>
              <Grid.Column>
                <Header as='h4' inverted><a href={this.props.company.homepage}>{this.props.company.homepage}</a></Header>
              </Grid.Column>
            </Grid>
            <Divider/>
            <Grid.Row>
	    <Grid.Row>
	      <Header as='h4' inverted>Looking for...</Header>
                  {_.map(companyJobs, (job, index) => <MakeJobCard key={index} job={job}/>)}  
	    </Grid.Row>
            </Grid.Row>
          </Grid.Column>
          <Grid.Row>
            <Grid.Row>
              <Header as='h4' inverted>Looking for...</Header>
              <Segment>
                {_.map(companyJobs, (job, index) => <MakeJobCard key={index} job={job}/>)}
              </Segment>
            </Grid.Row>
          </Grid.Row>
        </Grid>
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
  const sub2 = Meteor.subscribe(Jobs.userPublicationName);
  const sub3 = Meteor.subscribe(CompanyJobs.userPublicationName);
  const ready = sub1.ready() && sub2.ready() && sub3.ready();
  const company = Companies.collection.findOne(documentId);

  return {
    ready,
    company,
  };
})(CompanyProfile);

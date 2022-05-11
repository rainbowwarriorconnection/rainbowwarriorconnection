import React from 'react';
import { Card, Image, Icon, Button, Segment, Popup } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class MakeJobCard extends React.Component {
  render() {
    return (
          <Popup content={this.props.job.description + " " + this.props.job.salaryRange + " " + this.props.job.city + "," + this.props.job.state} trigger={
		  <Card><Card.Content><Icon name='lab'/>{this.props.job.jobTitle}</Card.Content></Card>
	  }/>
    );
  }
}

// Require a document to be passed to this component.
MakeJobCard.propTypes = {
  job: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(MakeJobCard);

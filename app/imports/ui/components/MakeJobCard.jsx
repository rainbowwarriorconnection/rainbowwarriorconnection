import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class MakeJobCard extends React.Component {
  render() {
    return (
      <Card style={{ background: '#376551', border: "none", boxShadow: "none" }}>
        <Card.Content>
          <Card.Header style={{ color: 'white' }}>{this.props.job.jobTitle}</Card.Header>
          <Card.Description style={{ color: 'white' }}>{this.props.job.description}</Card.Description>
          <Card.Description style={{ color: 'white' }}>{this.props.job.salaryRange}</Card.Description>
          <Card.Description style={{ color: 'white' }}>{this.props.job.city}, {this.props.job.state}</Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
MakeJobCard.propTypes = {
  job: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(MakeJobCard);

import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class MakeCompanyCard extends React.Component {
  render() {
    return (
      <Card
        href={`#view-company/${this.props.project._id}`}>
        <Card.Content>
          <Image floated='left' avatar src={this.props.project.picture}/>
          <Card.Header style={{ marginTop: '0px' }}>{this.props.project.name}</Card.Header>
          <Card.Meta>
            <span className='city'>{this.props.project.city}, { this.props.project.state} </span>
          </Card.Meta>
          <Card.Description>
            { this.props.project.description }
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
MakeCompanyCard.propTypes = {
  project: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(MakeCompanyCard);

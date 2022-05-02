import React from 'react';
import { Card, Image} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class MakeCard extends React.Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Image floated='right' size='mini' src={this.props.profile.picture} />
          <Card.Header>{this.props.profile.firstName} {this.props.profile.lastName} </Card.Header>
          <Card.Meta> {this.props.profile.state} </Card.Meta>
        </Card.Content>
        <Card.Content>
          {this.props.profile.description}
        </Card.Content>
        <Card.Content extra>
          <Link to={`/view-student/${this.props.profile._id}`}>View Profile</Link>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
MakeCard.propTypes = {
  profile: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(MakeCard);

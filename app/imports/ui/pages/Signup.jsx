import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
// import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import { Students } from '../../api/students/Students';
import { addStudentToRoleMethod } from '../../startup/both/Methods';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange= (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit= () => {
    const { email, firstName, lastName, description, picture, password } = this.state;
    Accounts.createUser({ email: email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        Students.collection.insert({ email, firstName, lastName, description, picture }, (err2) => {
          if (err2) {
            this.setState({ error: err2.reason });
          } else {
            this.setState({ error: '', redirectToReferer: true });
          }
        });
        Meteor.call(addStudentToRoleMethod, (err3) => {
          if (err3) {
            this.setState({ error: err3.reason });
          } else {
            this.setState({ error: '', redirectToReferer: true });
          }
        });
      }
    });
  }

  /** Display the signup form. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
      <Container id="signup-page">
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>
                Sign up for a new account
            </Header>
            <Form onSubmit={this.submit}>
              <Segment stacked>
                <Form.Input
                  label="Email"
                  id="signup-form-email"
                  icon="user"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                />
                <Form.Group inline widths='equal'>
                  <Form.Input fluid
                    label="First Name"
                    id="signup-form-firstname"
                    name="firstName"
                    type="firstname"
                    placeholder="First Name"
                    onChange={this.handleChange}
                  />
                  <Form.Input fluid
                    label="Last Name"
                    id="signup-form-lastname"
                    name="lastName"
                    placeholder="Last Name"
                    type=""
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Input
                  label="Picture URL"
                  id="signup-form-picture"
                  name="picture"
                  placeholder="URL"
                  type=""
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Password"
                  id="signup-form-password"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                />
                <Form.Button id="signup-form-submit" content="Submit"/>
              </Segment>
            </Form>
            <Message>
                Already have an account? Login <Link to="/signin">here</Link>
            </Message>
            {this.state.error === '' ? (
              ''
            ) : (
              <Message
                error
                header="Registration was not successful"
                content={this.state.error}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;

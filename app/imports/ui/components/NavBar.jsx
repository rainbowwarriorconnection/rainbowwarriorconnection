import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    return (
      <Menu attached="top" borderless className='menu-background'>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Image size="tiny" src="/images/Kermit-Logo-V1.png"/>
          <span style={{ fontWeight: 800, fontSize: '24px', color: 'white' }}>Rainbow Warrior Connection</span>
        </Menu.Item>

        {this.props.currentUser && this.isInRole('student') ? (
          [<Menu.Item as={NavLink} id="studentHomeMenuItem" activeClassName="active" exact to="/student-home" key='student-home'
            style={{ color: 'white' }}>Student Home</Menu.Item>]
        ) : ''}

        {this.props.currentUser && this.isInRole('company') ? ([<Menu.Item as={NavLink}
          id="companyHomeMenuItem" activeClassName="active" exact to="/company-home"
          key='company-home' style={{ color: 'white' }}>Company Home</Menu.Item>,
        <Menu.Item as={NavLink} id="addJobMenuItem" activeClassName="active" exact to="/addJob" key='addP'
          style={{ color: 'white' }}>Add Job</Menu.Item>]
        ) : ''}

        <Menu.Item as={NavLink} id="studentProfilesMenuItem" activeClassName="active" exact to="/profiles"
          key='profiles' style={{ color: 'white' }}>Browse Students</Menu.Item>
        <Menu.Item as={NavLink} id="projectsMenuItem" activeClassName="active" exact to="/companies"
          key='projects' style={{ color: 'white' }}>Browse Companies</Menu.Item>

        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Menu.Item as={NavLink} id="adminMenuItem" activeClassName="active" exact to="/admin" key='admin'
            style={{ color: 'white' }}>Admin</Menu.Item>
        ) : ''}
        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
            <Dropdown id="login-dropdown" text="Login" pointing="top right" icon={'user'} style={{ color: 'white' }}>
              <Dropdown.Menu>
                <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
                <Dropdown.Item id="login-dropdown-company-sign-up" icon="add user" text="Company Sign Up" as={NavLink} exact to="/company-signup"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user'} style={{ color: 'white' }}>
              <Dropdown.Menu>
                <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }

  isInRole(role) {
    return Roles.userIsInRole(Meteor.userId(), role);
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter so that links work. */
export default withRouter(NavBarContainer);

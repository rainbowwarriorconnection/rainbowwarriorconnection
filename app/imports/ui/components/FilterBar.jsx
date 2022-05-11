import React from 'react';
import { Container, Select, Input } from 'semantic-ui-react';
import { _ } from 'meteor/underscore';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
export default class FilterBar extends React.Component {

  constructor(props) {
    super(props);
    // eslint-disable-next-line react/prop-types
    this.onFilter = props.onFilter;
    this.interests = [];
    // eslint-disable-next-line react/prop-types
    _.map(props.interests, (interest) => this.interests.push({ key: interest, text: interest, value: interest }));
    this.state = {
      filterMode: 'interests',
      options: [
        { key: 'students', text: 'Students', value: 'students' },
        { key: 'interests', text: 'Interests', value: 'interests' },
      ],
    };
  }

  renderSearchBar() {
    return <Input onChange={this.onSearchInputChange} placeholder="Search name..." />;
  }

  renderInterestDropdown() {
    return <Select options={this.interests} onChange={this.onInterestDropdownChange} placeholder="Select one..." />;
  }

  onDropdownChange = (props, val) => {
    this.setState({ filterMode: (val.value === 'interests') ? 'interests' : 'students' });
    this.onFilter('', '');
  }

  onSearchInputChange = (props, val) => {
    this.onFilter('search', val.value);
  }

  onInterestDropdownChange = (props, val) => {
    this.onFilter('interests', val.value);
  }

  render() {
    return (
      <Container className="filter-format">
        <Select className="selection-format" compact options={this.state.options} defaultValue='interests' onChange={this.onDropdownChange}/>
        {(this.state.filterMode === 'interests') ? this.renderInterestDropdown() : this.renderSearchBar()}
      </Container>
    );
  }
}

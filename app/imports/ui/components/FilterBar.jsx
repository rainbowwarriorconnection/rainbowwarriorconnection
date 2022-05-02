import React from 'react';
import { Container, Select, Input, Loader, Card, Image, Label } from 'semantic-ui-react';
import {_} from 'meteor/underscore';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
export default class FilterBar extends React.Component {

  constructor(props) {
    super(props);
    this.onFilter = props.onFilter;
    this.interests = []
    _.map(props.interests, (interest) => this.interests.push({ key: interest, text: interest, value: interest }))
    this.state = {
        filterMode: "interests",
        options: [
           { key: 'students', text: 'Students', value: 'students' },
           { key: 'interests', text: 'Interests', value: 'interests' },
        ]
    }
  }

  renderSearchBar() {
     return <Input onChange={this.onSearchBarChange}/>
  }

  renderDropdown() {
     return <Select options={this.interests} onChange={this.onSelectChange} />
  }

  onDropdownChange = (props, val) => {
     this.setState( { filterMode: (val.value === "interests") ? "interests" : "students" } );
  }
  onSearchBarChange = (props, val) => {
    this.onFilter("search", val.value)
  }

  onSelectChange = (props, val) => {
    this.onFilter("interests", val.value)
  }

  render() {
    return (
      <Container className="filter-format">
        <Select className="selection-format" compact options={this.state.options} defaultValue='interests' onChange={this.onDropdownChange}/>
        {(this.state.filterMode === "interests") ? this.renderDropdown() : this.renderSearchBar()}
      </Container>
    );
  }
}


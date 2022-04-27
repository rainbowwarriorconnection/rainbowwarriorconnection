import React from 'react';
import { Container, Grid, Header, Dropdown, Input, Button } from 'semantic-ui-react';

/** Renders a color-blocked static landing page. */
class AdminHome extends React.Component {
  render() {
    return (
      <div id="landing-page">
        <div className='landing-green-background'>
          <Container textAlign='center'>
            <Header style={{ paddingTop: '20px', color: 'white', fontSize: '36pt' }} as='h1'>
              Welcome to the Rainbow Warrior Connection Administrator!
            </Header>
            <Header style={{ paddingBottom: '20px', color: 'white' }} as='h2'>
              Please edit any skills, locations, etc.
            </Header>

          </Container>
        </div>

        <Grid columns={4} centered>
          <Grid.Row>
            <Grid.Column width={2}>
              <Header style={{ color: 'white' }} as='h3'>
                Add
              </Header>
            </Grid.Column>
            <Grid.Column width={2}>
              <Dropdown
                button
                className='icon'
                floating
                labeled
                icon='world'
                search
                text='Select Option'
              />
            </Grid.Column>
            <Grid.Column width={2}>
              <Input placeholder='Input'></Input>
            </Grid.Column>
            <Grid.Column width={3}>
              <Button>Submit</Button>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={2}>
              <Header style={{ color: 'white' }} as='h3'>
                Delete
              </Header>
            </Grid.Column>
            <Grid.Column width={2}>
              <Dropdown
                button
                className='icon'
                floating
                labeled
                icon='world'
                search
                text='Select Option'
              />
            </Grid.Column>
            <Grid.Column width={2}>
              <Dropdown
                button
                className='icon'
                floating
                labeled
                icon='world'
                search
                text='Select Option'
              />
            </Grid.Column>
            <Grid.Column width={3}>
              <Button>Submit</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default AdminHome;

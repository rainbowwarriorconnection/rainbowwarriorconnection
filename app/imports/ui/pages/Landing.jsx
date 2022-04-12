import React from 'react';
import { Grid, Icon, Container, Header } from 'semantic-ui-react';

/** Renders a color-blocked static landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div id="landing-page">
        <div className='landing-green-background'>
          <Container textAlign='center'>
            <Header style={{ paddingTop: '20px', color: 'white', fontSize: '36pt' }} as='h1'>
              Welcome to the Rainbow Warrior Connection!
            </Header>
            <Header style={{ paddingBottom: '20px', color: 'white' }} as='h3'>
              Browse jobs from companies, students looking for jobs, and more!
            </Header>
          </Container>
        </div>
        <div className='home-landing-background'>
          <Grid style={{ paddingTop: '20px' }} container centered stackable columns={3}>

            <Grid.Column textAlign='center'>
              <Icon size="huge" name="users" style={{ color: '#6E181F' }}/>
              <Header as='h1' style={{ color: '#6E181F' }}>Multiple Users</Header>
              <Header as='h3' style={{ color: '#6E181F' }}>This website allows UH Manoa
                students and tech companies to create profiles and show them on our website.</Header>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <Icon size="huge" name="address book" style={{ color: '#6E181F' }}/>
              <Header as='h1' style={{ color: '#6E181F' }}>Contact Details</Header>
              <Header as='h3' style={{ color: '#6E181F' }}>Students are able to browse companies and their geographical location to find the
                best job for them. Companies and browse students and post jobs on the websites to recruit students.</Header>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <Icon size="huge" name="sitemap" style={{ color: '#6E181F' }}/>
              <Header as='h1' style={{ color: '#6E181F' }}>Browse for Free</Header>
              <Header as='h3' style={{ color: '#6E181F' }}>Anyone can browse this website and see what
                companies are hiring and who are looking for jobs.</Header>
            </Grid.Column>
          </Grid>
        </div>
      </div>

    );
  }
}

export default Landing;

import React from 'react';
import { Grid, Icon, Container, Header, Image } from 'semantic-ui-react';

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
          <div className='transparency'>
            <Image src="/images/Kermit-Logo-V3-Lined.png" size='large' style={{ paddingTop: '20px' }} centered/>
            <Grid style={{ paddingTop: '20px' }} container centered stackable columns={3}>
              <Grid.Column textAlign='center'>
                <Icon size="huge" name="user" style={{ color: 'white' }}/>
                <Header as='h1' style={{ color: 'white' }}>Students</Header>
                <Header as='h3' style={{ color: 'white' }}>Create a profile with your skills,
                  contact information, and headshot. Put yourself out to the world as you search for your job in the tech industry.</Header>
              </Grid.Column>

              <Grid.Column textAlign='center'>
                <Icon size="huge" name="briefcase" style={{ color: 'white' }}/>
                <Header as='h1' style={{ color: 'white' }}>Companies</Header>
                <Header as='h3' style={{ color: 'white' }}>Create your company profile with your location, company background, salaries,
                  and contact info.
                  Create job postings so students can see types of jobs offered, salary, and positions.
                </Header>
              </Grid.Column>

              <Grid.Column textAlign='center'>
                <Icon size="huge" name="sitemap" style={{ color: 'white' }}/>
                <Header as='h1' style={{ color: 'white' }}>Browse for Free</Header>
                <Header as='h3' style={{ color: 'white' }}>Anyone can browse this website and see what
                  companies are hiring and who are looking for jobs.</Header>
              </Grid.Column>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;

import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    return (
      <div className='landing-green-background'>
        <footer>
          <div className="ui center aligned container">
              Rainbow Warrior Connection Project <br />
              University of Hawaii<br />
              Honolulu, HI 96822 <br />
            <a style={{ color: 'white' }} href="https://rainbowwarriorconnection.github.io/">https://rainbowwarriorconnection.github.io/</a>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;

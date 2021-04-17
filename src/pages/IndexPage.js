import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';



function IndexPage(props={}) {
  const me = props.me;
  return (
    <Container className="mt-3 w-75">
      <h1>Fat2Fit Web</h1>
      <hr></hr>
      {me &&
      <h3>Hello {me.firstName}!</h3>}
      <p>
        Welcome to Fat2Fit's web application. We're happy to see what you have to offer.<br></br>
      </p>

      <p>
        Some key features of the app:
        <ul>
          <li>Viewing challenge progress</li>
          <li>Auto log in when launching</li>
        </ul>
      </p>
    </Container>
  );
}

const mapStateToProps = (state, ownProps) => ({ ...state });
export default connect(mapStateToProps)(IndexPage);

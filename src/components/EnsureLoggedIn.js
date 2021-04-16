import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Toast from '../helpers/Toast';

const DEFAULT_MESSAGE = 'Must be logged in';
const DEFAULT_FLIPPED = 'Already logged in';

let call = true;

/**
 * @param {{
 * me: any,
 * redirect: string,
 * children: React.ReactNode,
 * message?: string,
 * flipped?: boolean,
 * }} props
 */
function EnsureLoggedIn({ me, redirect, message, flipped=false, children }={}) {
  if (!me === !!flipped) {
    return children;
  }
  if (call) {
    Toast.error(message || (flipped ? DEFAULT_FLIPPED : DEFAULT_MESSAGE));
  }
  call = !call;
  return <Redirect to={redirect || '/login'} />
}


const mapStateToProps = (state, ownProps) => ({ ...state });

/**
 * will redirect the user if they are not logged in
 */
export default connect(mapStateToProps, null)(EnsureLoggedIn);

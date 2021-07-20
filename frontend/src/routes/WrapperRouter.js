import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export default function WrapperRouter({
  component: Component,
  isPrivate = false,
  ...rest
}) {
  const signed = localStorage.getItem('token');

  if (!signed && isPrivate) {
    console.log(signed);
    return <Redirect to="/" />;
  }
  return <Route {...rest} render={props => <Component {...props} />} />;
}

WrapperRouter.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

WrapperRouter.defaultProps = {
  isPrivate: false,
};

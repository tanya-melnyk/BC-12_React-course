import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ title }) => {
  return (
    <header>
      <span>Header</span>
      {title && <h2>{title}</h2>}
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;

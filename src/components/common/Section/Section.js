import React from 'react';
import PropTypes from 'prop-types';

const Section = ({ icon, title, children }) => {
  return (
    <div>
      Section
      <div>
        <div>
          <img src={icon} alt={title} />
        </div>
        <h3>{title}</h3>
      </div>
      {children}
    </div>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Section;

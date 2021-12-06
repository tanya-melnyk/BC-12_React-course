import React from 'react';
import PropTypes from 'prop-types';

const Tutor = props => {
  // const { firstName, lastName } = props;
  return (
    <div>
      <div>
        <p>{props.lastName}</p>
        <p>{props.firstName}</p>
        <p>Александровна</p>
      </div>
      <div>
        <p>
          <span>+38(097) 448 73 11</span>
        </p>
        <p>
          <span>rudenko.mail@gmail.com</span>
        </p>
        <p>
          <span>Полтава</span>
        </p>
      </div>
      <div>
        <p>Создание групп</p>
      </div>
    </div>
  );
};

Tutor.propTypes = {};

export default Tutor;

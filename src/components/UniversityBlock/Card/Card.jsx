import React from 'react';
import PropTypes from 'prop-types';
import univerBuildingImg from 'images/building.png';
import { ReactComponent as EditIcon } from 'images/edit.svg';
import { ReactComponent as DeleteIcon } from 'images/delete.svg';

const Card = ({ name }) => {
  return (
    <div>
      <div>
        <img src={univerBuildingImg} alt="University" />
      </div>
      <p>университет</p>
      <h3>{name}</h3>
      <div>
        <button aria-label="Edit">
          <DeleteIcon />
        </button>
        <button aria-label="Delete">
          <EditIcon />
        </button>
      </div>
    </div>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Card;

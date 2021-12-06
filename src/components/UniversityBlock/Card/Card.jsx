import React from 'react';
import PropTypes from 'prop-types';
import univerBuilding from 'images/building.png';
import { ReactComponent as EditIcon } from 'images/edit.svg';
import { ReactComponent as DeleteIcon } from 'images/delete.svg';

const Card = ({ name }) => {
  const isAdmin = false;
  return (
    <div>
      Card
      <div>
        <img src={univerBuilding} alt="University" />
      </div>
      <p>университет</p>
      <h3>{name}</h3>
      <div>
        {/* {isAdmin && (
          <button>
            <DeleteIcon />
          </button>
        )}

        {!isAdmin && (
          <button>
            <EditIcon />
          </button>
        )}

        {isAdmin ? (
          <button>
            <DeleteIcon />
          </button>
        ) : (
          <button>
            <EditIcon />
          </button>
        )} */}

        <button>
          <DeleteIcon />
        </button>

        <button>
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

import React from 'react';
import PropTypes from 'prop-types';
import univerBuildingImg from 'images/building.png';
import { ReactComponent as EditIcon } from 'images/edit.svg';
import { ReactComponent as DeleteIcon } from 'images/delete.svg';
import s from './Card.module.css';

/**
 * Используя временную переменную isAdmin определим классы кнопочек
 * Если isAdmin true, то кнопочки могут быть активны,
 * а если false - неактивны
 */

const Card = ({ name }) => {
  return (
    <div className={s.card}>
      <div className={s.imgWrapper}>
        <img src={univerBuildingImg} alt="University" />
      </div>
      <p className={s.text}>университет</p>
      <h3 className={`heading ${s.wrapper}`}>{name}</h3>
      <div className={s.btn_container}>
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

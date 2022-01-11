import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ImageInput from 'components/common/ImageInput/ImageInput';
import { getImage, addImage } from 'redux/univer/univer-slice';
import univerBuildingImg from 'images/building.png';
import { ReactComponent as EditIcon } from 'images/edit.svg';
import { ReactComponent as DeleteIcon } from 'images/delete.svg';
import s from './Card.module.css';

const Card = ({ name }) => {
  const isAdmin = true;

  const dispatch = useDispatch();
  const { image, loading } = useSelector(state => state.univer);

  useEffect(() => {
    dispatch(getImage());
  }, [dispatch]);

  const saveImage = image => dispatch(addImage(image));

  return (
    <div className={s.card}>
      <div className={s.imgWrapper}>
        {!loading && (
          <ImageInput
            onUpload={saveImage}
            savedImage={image ?? univerBuildingImg}
          />
        )}
        {/* <img src={univerBuildingImg} alt="University" /> */}
      </div>
      <p className={s.text}>университет</p>
      <h3 className={`heading ${s.wrapper}`}>{name}</h3>
      <div className={s.btn_container}>
        <button type="button" className={s.active} aria-label="Edit">
          <EditIcon />
        </button>
        <button
          type="button"
          disabled={!isAdmin}
          className={isAdmin ? s.active : s.disabled}
          aria-label="Delete"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Card;

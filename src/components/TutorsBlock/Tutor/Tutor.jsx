/** @jsxImportSource @emotion/react */

import PropTypes from 'prop-types';
import { ReactComponent as PhoneIcon } from 'images/phone.svg';
import { ReactComponent as MailIcon } from 'images/mail.svg';
import { ReactComponent as LocationIcon } from 'images/location.svg';

/**
 * Добавим коммент из документации
 * Перепишем scss стили в переменные
 * blockStyles, nameStyles, dataStyles, dataTextStyles
 * в стиле объекта
 * Переменные используем в пропах css соответствующих элементов
 */

// .block {
// display: flex;
// padding: 14px;
// font-size: 16px;
// line-height: 1.5;
// }
// .name {
//   padding-right: 24px;
//   flex: 0 0 200px;
// }
// .data {
//   composes: name;
//   flex-basis: 300px;
// }
// .dataText {
// display: flex;
// align-items: center;
// & .text {
//   margin-left: 8px;
// }
// }

const blockStyles = {
  display: 'flex',
  padding: 14,
  fontSize: 16,
  lineHeight: 1.5,
};

const nameStyles = {
  paddingRight: 24,
  flex: '0 0 200px',
};

const dataStyles = {
  ...nameStyles,
  flexBasis: 300,
};

const dataTextStyles = {
  display: 'flex',
  alignItems: 'center',
  '& .text': {
    marginLeft: 8,
  },
};

const Tutor = props => {
  const { firstName, lastName, patronymic, phone, email, city, options } =
    props;
  return (
    <div css={blockStyles}>
      <div css={nameStyles}>
        <p>{lastName}</p>
        <p>{firstName}</p>
        <p>{patronymic}</p>
      </div>
      <div css={dataStyles}>
        <p css={dataTextStyles}>
          <PhoneIcon />
          <span className="text">{phone}</span>
        </p>
        <p css={dataTextStyles}>
          <MailIcon />
          <span className="text">{email}</span>
        </p>
        <p css={dataTextStyles}>
          <LocationIcon />
          <span className="text">{city}</span>
        </p>
      </div>
      <div>
        <p>{options}</p>
      </div>
    </div>
  );
};

Tutor.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  patronymic: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  options: PropTypes.string.isRequired,
};

export default Tutor;

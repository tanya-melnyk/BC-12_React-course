// /** @jsxImportSource @emotion/react */

import PropTypes from 'prop-types';
import s from './Section.module.css';

// const sectionStyle = {
//   position: 'relative',
//   marginBottom: 32,

//   '& .header': {
//     display: 'flex',
//     alignItems: 'center',
//     marginBottom: '32px',

//     '& .img-wrapper': {
//       marginRight: 8,
//     },
//   },
// };

const Section = ({ icon, title, children }) => {
  return (
    <section className={s.section}>
      <div className={s.header}>
        <div className={s.imgWrapper}>
          <img src={icon} alt={title} />
        </div>
        <h3 className="heading">{title}</h3>
      </div>
      {children}
    </section>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Section;

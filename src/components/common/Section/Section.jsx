import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext, themes } from 'context/themeContext';
import s from './Section.module.css';

const Section = ({ icon, title, children }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <section className={s.section}>
      <div className={theme === themes.light ? s.lightTheme : s.darkTheme}>
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

import css from './ThemeSwitcher.module.css';

const ThemeSwitcher = () => {
  return (
    <div className={css.container}>
      <label className={css.switch}>
        <input
          type="checkbox"
          // onChange={}
          // checked={}
        />
        <span className={`${css.slider} ${css.round}`}></span>
      </label>
    </div>
  );
};

export default ThemeSwitcher;

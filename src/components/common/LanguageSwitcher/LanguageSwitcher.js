import s from './LanguageSwitcher.module.scss';
import ukrFlagIcon from 'images/ukrainian.png';
import rusFlagIcon from 'images/russian.png';
import ukFlagIcon from 'images/english.png';

const languages = {
  en: { icon: ukFlagIcon, nativeName: 'English' },
  uk: { icon: ukrFlagIcon, nativeName: 'Українська' },
  ru: { icon: rusFlagIcon, nativeName: 'Русский' },
};

const LanguageSwitcher = props => {
  return (
    <div className={s.switcher}>
      {Object.keys(languages).map(lng => (
        <div key={lng} className={s.btnWrapper}>
          <button className={s.button} type="submit" onClick={() => {}}>
            <img
              src={languages[lng].icon}
              alt={languages[lng].nativeName}
              width="50"
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default LanguageSwitcher;

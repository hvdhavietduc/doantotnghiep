import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
// import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
//import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faGlobe } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import styles from './WrapperAuth.scss';
// import notify from '~/utils/notify';
import config from '~/config';

const cx = classNames.bind(styles);

function WrapperAuth({ title, children, BackLoginPage, clearErrors = () => {} }) {
    const { t, i18n } = useTranslation('translation', { keyPrefix: 'Auth' });
    // eslint-disable-next-line no-unused-vars
    // const [cookies, setCookies] = useCookies(['token']);
    // const navigate = useNavigate();

    const handleChangeLanguage = () => {
        if (i18n.language === config.language.ENGLISH) {
            i18n.changeLanguage(config.language.VIETNAM);
            localStorage.setItem('language', config.language.VIETNAM);
            clearErrors();
            return;
        }
        if (i18n.language === config.language.VIETNAM) {
            i18n.changeLanguage(config.language.ENGLISH);
            localStorage.setItem('language', config.language.ENGLISH);
            clearErrors();
            return;
        }
    };

    // useEffect(() => {
    //     if (cookies.token) {
    //         notify.error(config.notification().USER_LOGED_IN);
    //         navigate(config.routes.HOME);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
    return (
        <div className={cx('WrapperAuth')}>
            <div className={cx('wave wave1')}></div>
            <div className={cx('wave wave2')}></div>
            <div className={cx('wave wave3')}></div>
            <div className={cx('wave wave4')}></div>
            <div className={cx('container')}>
                <div className={cx('title')}>{title}</div>
                <div className={cx('form')}>{children}</div>
                <footer className={cx('footer')}>
                    <FontAwesomeIcon icon={faArrowLeftLong} />
                    {BackLoginPage ? (
                        <Link to={config.routes.auth.LOGIN}>{t('back_to_login_page')}</Link>
                    ) : (
                        <Link to={config.routes.HOME}>{t('back_to_home_page')}</Link>
                    )}
                </footer>
            </div>
            <Tippy delay={[0, 50]} content={t('change_language')} placement="bottom">
                <button className={cx('btn-changeLanguage')} onClick={handleChangeLanguage}>
                    <FontAwesomeIcon className={cx('icon')} icon={faGlobe} />
                </button>
            </Tippy>
        </div>
    );
}

WrapperAuth.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    BackLoginPage: PropTypes.bool,
    clearErrors: PropTypes.func,
};

export default WrapperAuth;

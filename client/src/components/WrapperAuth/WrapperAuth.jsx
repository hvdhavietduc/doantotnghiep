import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faGlobe } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import styles from './WrapperAuth.scss';
import config from '~/config';

const cx = classNames.bind(styles);

function WrapperAuth({ title, children, BackLoginPage, clearErrors = () => {} }) {
    const { t, i18n } = useTranslation('translation', { keyPrefix: 'Auth' });

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

    return (
        <div
            className={cx(
                'relative z-10 flex h-screen w-full items-center  justify-center overflow-hidden bg-teal-200 ',
                'max-sm: max-sm: h-full !w-full',
                'WrapperAuth',
            )}
        >
            <div className={cx('wave wave1')}></div>
            <div className={cx('wave wave2')}></div>
            <div className={cx('wave wave3')}></div>
            <div className={cx('wave wave4')}></div>
            <div
                className={cx(
                    'z-[5] flex w-[420px] flex-col items-center justify-center rounded-lg bg-cyan-50/60 py-10',
                )}
            >
                <div className={cx('mb-10 text-center text-3xl font-bold text-violet-500')}>{title}</div>
                <div className={cx('w-[260px]', 'form')}>{children}</div>
                <footer className={cx('mt-[25px] w-[240px] flex-1')}>
                    <FontAwesomeIcon icon={faArrowLeftLong} />
                    {BackLoginPage ? (
                        <Link to={config.routes.auth.LOGIN}>{t('back_to_login_page')}</Link>
                    ) : (
                        <Link to={config.routes.HOME}>{t('back_to_home_page')}</Link>
                    )}
                </footer>
            </div>
            <Tippy delay={[0, 50]} content={t('change_language')} placement="bottom">
                <button
                    className={cx('absolute right-7 top-7 z-20', 'btn-changeLanguage')}
                    onClick={handleChangeLanguage}
                >
                    <FontAwesomeIcon className={cx('text-3xl')} icon={faGlobe} />
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

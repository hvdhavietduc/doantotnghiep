import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

import styles from './Action.module.scss';
import Button from '~/components/Button';
import Menu from '../Menu';
import Image from '~/components/Image';
import Loading from '~/components/Loading';
import { logout } from '~/services/authServices';
import NoimageAvatar from '~/assets/img/noImageAvatar.png';
import notify from '~/utils/notify';
import i18next from '~/utils/i18n';
import config from '~/config';
import { getMENU_ITEMS } from '../Constant';
const cx = classNames.bind(styles);

function Action({ userMenu }) {
    const [currentUser, setCurrentUser] = useState(false);
    const [inforUser, setInforUser] = useState(null);
    const [loading, setLoading] = useState(false);

    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const { i18n, t } = useTranslation();
    const navigate = useNavigate();

    const MENU_ITEMS = getMENU_ITEMS();

    // Handle logic

    const handleLogout = () => {
        const token = cookies.token;
        setLoading(true);
        logout(token)
            .then(() => {
                setLoading(false);
                localStorage.clear();
                removeCookie('token');
                navigate(config.routes.auth.LOGIN);
            })
            .catch((error) => {
                setLoading(false);
                if (!error.response) {
                    notify.error(config.errorMesseage.getMesseageNotify().ERROR_NETWORD);
                    return;
                }

                notify.error(error.response.data.message);
            });
    };

    const changeLanguage = (la) => {
        i18n.changeLanguage(la);
    };

    const handleChangeLanguage = (menuItem) => {
        switch (menuItem.title) {
            case i18next.t('Header.english'):
                changeLanguage(config.language.ENGLISH);
                localStorage.setItem('language', config.language.ENGLISH);
                break;
            case i18next.t('Header.vietnam'):
                changeLanguage(config.language.VIETNAM);
                localStorage.setItem('language', config.language.VIETNAM);
                break;
            default:
        }
    };

    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                handleChangeLanguage(menuItem);
                break;
            default:
        }

        //item in the outermost layer
        switch (menuItem.title) {
            case i18next.t('Header.log_out'):
                handleLogout();
                break;
            default:
        }
    };

    useEffect(() => {
        const token = cookies.token;
        if (token) {
            setCurrentUser(true);
            setInforUser({
                name: localStorage.getItem('name'),
                username: localStorage.getItem('name'),
                email: localStorage.getItem('email'),
                avatar: localStorage.getItem('avatar'),
            });
        }
    }, [cookies.token]);

    return (
        <Fragment>
            <div className={cx('flex items-center justify-end')}>
                {currentUser ? (
                    <></>
                ) : (
                    <Fragment>
                        <Button className={cx('mr-2 h-9 px-2')} primary to={config.routes.auth.LOGIN}>
                            {t('Auth.login')}
                        </Button>
                        <Button className={cx('h-9  px-2', 'max-sm:hidden')} primary to={config.routes.auth.SIGNUP}>
                            {t('Auth.signup')}
                        </Button>
                    </Fragment>
                )}
                <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                    {currentUser ? (
                        <Image
                            className={cx('ml-[14px] h-8 w-8 cursor-pointer rounded-full object-cover')}
                            src={inforUser.avatar}
                            alt={inforUser.name}
                            fallback={NoimageAvatar}
                        />
                    ) : (
                        <button className={cx('ml-3 cursor-pointer bg-transparent px-1 py-2 text-xl')}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>
                    )}
                </Menu>
            </div>
            {loading && <Loading />}
        </Fragment>
    );
}

Action.propTypes = {
    userMenu: PropTypes.array.isRequired,
};

export default Action;

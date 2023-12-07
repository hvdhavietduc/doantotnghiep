import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

import styles from './Action.module.scss';
import Button from '~/components/Button';
import Menu from '../Menu';
import Loading from '~/components/Loading';
import { logout } from '~/services/authServices';
import notify from '~/utils/notify';
import i18next from '~/utils/i18n';
import config from '~/config';
import { getMENU_ITEMS, getUserMenu } from '../Constant';
const cx = classNames.bind(styles);

function Action() {
    const [currentUser, setCurrentUser] = useState(false);
    const [inforUser, setInforUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const { i18n } = useTranslation();

    const navigate = useNavigate();

    const MENU_ITEMS = getMENU_ITEMS();
    const userMenu = getUserMenu();

    // Handle logic

    const handleLogout = () => {
        const cookie = new Cookies();
        const token = cookie.get('token');
        setLoading(true);
        logout(token)
            .then(() => {
                setLoading(false);
                localStorage.clear();
                cookie.remove('token');
                navigate(config.routes.auth.LOGIN);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
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
        const cookies = new Cookies();
        const token = cookies.get('token');
        if (token) {
            setCurrentUser(true);
            setInforUser({
                name: localStorage.getItem('name'),
                username: localStorage.getItem('name'),
                email: localStorage.getItem('email'),
                avatar: localStorage.getItem('avatar'),
            });
        }
    }, []);

    return (
        <Fragment>
            <div className={cx('action')}>
                {currentUser ? (
                    <></>
                ) : (
                    <Fragment>
                        <Button className={cx('btn-login')} primary to={config.routes.auth.LOGIN}>
                            Log in
                        </Button>
                        <Button className={cx('btn-signup')} primary to={config.routes.auth.SIGNUP}>
                            Sign up
                        </Button>
                    </Fragment>
                )}
                <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                    {currentUser ? (
                        <img
                            className={cx('user-avatar')}
                            src="https://files.fullstack.edu.vn/f8-prod/user_avatars/1/623d4b2d95cec.png"
                            alt={inforUser.avatar}
                        />
                    ) : (
                        <button className={cx('more-btn')}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>
                    )}
                </Menu>
            </div>
            {loading && <Loading />}
        </Fragment>
    );
}

export default Action;

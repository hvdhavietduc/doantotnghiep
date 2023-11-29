import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisVertical,
    faCircleQuestion,
    faEarthAsia,
    faUser,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';

import styles from './Action.module.scss';
import Button from '~/components/Button';
import Menu from '../Menu';
import { logout } from '~/services/authServices';
import notify from '~/utils/notify';
import config from '~/config';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: faEarthAsia,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: faCircleQuestion,
        title: 'Feedback and help',
        to: '',
    },
];

const userMenu = [
    {
        icon: faUser,
        title: 'View profile',
        to: '',
    },
    ...MENU_ITEMS,
    {
        icon: faSignOut,
        title: 'Log out',
        to: '',
        separate: true,
    },
];

function Action() {
    const [currentUser, setCurrentUser] = useState(false);

    const navigate = useNavigate();

    // Handle logic

    const handleLogout = () => {
        const cookie = new Cookies();
        const token = cookie.get('token');
        const name = localStorage.getItem('name');
        const data = { name };
        logout(data, token)
            .then(() => {
                localStorage.clear();
                cookie.remove('token');
                navigate(config.routes.LOGIN);
            })
            .catch((error) => {
                console.log(error);
                if (!error.response) {
                    notify.error(config.errorMesseage.ERROR_NETWORD);
                    return;
                }

                notify.error(error.response.data.message);
            });
    };

    const handleMenuChange = (menuItem) => {
        console.log(menuItem);
        switch (menuItem.title) {
            case 'Log out':
                handleLogout();
                break;

            // case 'language':
            //     // Handle change language
            //     break;
            default:
        }
    };

    useEffect(() => {
        const cookies = new Cookies();
        const token = cookies.get('token');
        if (token) {
            setCurrentUser(true);
        }
    }, []);

    return (
        <div className={cx('action')}>
            {currentUser ? (
                <></>
            ) : (
                <Fragment>
                    <Button className={cx('btn-login')} primary to={config.routes.LOGIN}>
                        Log in
                    </Button>
                    <Button className={cx('btn-signup')} primary to={config.routes.SIGNUP}>
                        Sign up
                    </Button>
                </Fragment>
            )}
            <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                {currentUser ? (
                    <img
                        className={cx('user-avatar')}
                        src="https://files.fullstack.edu.vn/f8-prod/user_avatars/1/623d4b2d95cec.png"
                        alt="Nguyen Van A"
                    />
                ) : (
                    <button className={cx('more-btn')}>
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </button>
                )}
            </Menu>
        </div>
    );
}

export default Action;

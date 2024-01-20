import classNames from 'classnames/bind';
import { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import styles from './HeaderAdmin.module.scss';
import Action from '~/layout/Header/Action';
import logo from '~/assets/img/logo.png';
import Image from '~/components/Image';
import config from '~/config';
import { getNavigationAdmin } from '~/layout/Header/Constant';
import { getAdminMenu } from '../Constant';

const cx = classNames.bind(styles);

function HeaderAdmin() {
    // const currentLanguage = useSelector((state) => state.language.currentLanguage);

    const [showMenu, setShowMenu] = useState(false);

    const location = useLocation();
    const { i18n } = useTranslation('translation');

    const currentPath = location.pathname;
    const navigation = getNavigationAdmin();
    const currentLanguage = localStorage.getItem('language');
    const userMenu = getAdminMenu();

    const handleClickBtnMenu = () => {
        if (showMenu === false) {
            setShowMenu(true);
            return;
        }
        setShowMenu(false);
    };

    const changeLanguage = (la) => {
        i18n.changeLanguage(la);
    };

    useLayoutEffect(() => {
        changeLanguage(currentLanguage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('header')}>
            <div className={cx('inner')}>
                <button className={cx('menu-btn')} onClick={handleClickBtnMenu}>
                    <FontAwesomeIcon icon={faBars} />
                </button>

                <Link to={config.routes.HOME} className={cx('logo-link')}>
                    <Image src={logo} />
                </Link>

                <ul
                    className={cx('navigation', {
                        'navigation-active': showMenu,
                    })}
                >
                    {navigation.map((value, index) => {
                        return (
                            <li
                                key={index}
                                className={cx(
                                    'navigation-item',
                                    currentPath.includes(value.link) && 'navigation-item-curent',
                                )}
                            >
                                <Link to={value.link} onClick={handleClickBtnMenu}>
                                    {value.title}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <Action userMenu={userMenu} />
            </div>
        </div>
    );
}

export default HeaderAdmin;

import classNames from 'classnames/bind';
import { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import Search from './Search';
import Action from '~/layout/Header/Action';
import logo from '~/assets/img/logo.png';
import Image from '~/components/Image';
import config from '~/config';
import { getNavigation } from '~/layout/Header/Constant';
import { getUserMenu } from '../Constant';

const cx = classNames.bind(styles);

function Header() {
    // const currentLanguage = useSelector((state) => state.language.currentLanguage);

    const [showMenu, setShowMenu] = useState(false);
    const [showBoxSearch, setShowBoxSearch] = useState(false);

    const location = useLocation();
    const { i18n } = useTranslation('translation', { keyPrefix: 'Header' });

    const currentPath = location.pathname;
    const navigation = getNavigation();
    const currentLanguage = localStorage.getItem('language');
    const isAdmin = localStorage.getItem('role') === 'ADMIN';
    let userMenu = isAdmin
        ? getUserMenu()
        : getUserMenu().filter((value) => value.to !== config.routes.admin.MANAGEUSER);

    const handleClickBtnMenu = () => {
        if (showMenu === false) {
            setShowMenu(true);
            return;
        }
        setShowMenu(false);
    };

    const openSearch = () => {
        setShowBoxSearch(true);
    };

    const closeSearch = () => {
        setShowBoxSearch(false);
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

                <Search showBoxSearch={showBoxSearch} />

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

                {!showBoxSearch && (
                    <button className={cx('open-search')} onClick={openSearch}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                )}
                {showBoxSearch && (
                    <button className={cx('close-search')} onClick={closeSearch}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                )}

                <Action userMenu={userMenu} />
            </div>
        </div>
    );
}

export default Header;

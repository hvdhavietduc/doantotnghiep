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
        <div className={cx('fixed left-0 top-0 z-10 flex w-full justify-center ', 'header')}>
            <div className={cx('flex h-full w-full items-center justify-between', 'max-xl:relative', 'inner')}>
                <button className={cx('invisible', 'max-xl:visible max-xl:pr-4')} onClick={handleClickBtnMenu}>
                    <FontAwesomeIcon icon={faBars} />
                </button>

                <Link to={config.routes.HOME} className={cx('flex', 'logo-link')}>
                    <Image src={logo} />
                </Link>

                <Search showBoxSearch={showBoxSearch} />

                <ul
                    className={cx(
                        'mr-4 flex h-full flex-1 items-center justify-end',
                        'max-xl:invisible max-xl:absolute max-xl:left-0 max-xl:flex max-xl:h-auto max-xl:w-full ',
                        'max-xl:translate-x-[-100%] max-xl:flex-col max-xl:overflow-hidden',
                        'navigation',
                        {
                            'max-xl:!visible max-xl:!translate-x-0': showMenu,
                            'navigation-active': showMenu,
                        },
                    )}
                >
                    {navigation.map((value, index) => {
                        return (
                            <li
                                key={index}
                                className={cx(
                                    'flex h-full cursor-pointer items-center px-2 py-0 text-[0.90625rem] font-semibold',
                                    'max-xl:w-full max-xl:!py-3 max-xl:!text-[0.9375rem]',
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

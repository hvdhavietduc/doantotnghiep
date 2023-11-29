import classNames from 'classnames/bind';
import { useState } from 'react';
import {} from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import Search from './Search';
import Action from './Action';
import logo from '~/assets/img/logo.png';
import config from '~/config';

const cx = classNames.bind(styles);

const navigation = [
    { title: 'Translation', link: config.routes.TRANSLATION },
    { title: 'WordBooks', link: '' },
    { title: 'Video', link: '' },
    { title: 'News', link: '' },
    { title: 'Text online', link: '' },
    { title: 'Forum', link: '' },
    { title: 'Chat AI', link: '' },
    { title: 'Game', link: '' },
];

function Header() {
    const [indexNavigate, setIndexNavigate] = useState(-1);

    const handleNavigate = (index) => {
        console.log(indexNavigate);
        setIndexNavigate(index);
    };

    return (
        <div className={cx('header')}>
            <div className={cx('inner')}>
                <Link to={config.routes.HOME} className={cx('logo-link')}>
                    <img src={logo} alt="NoImage" />
                </Link>

                <Search />

                <ul className={cx('navigation')}>
                    {navigation.map((value, index) => {
                        return (
                            <li
                                key={index}
                                className={cx('navigation-item', index === indexNavigate && 'navigation-item-curent')}
                                onClick={() => handleNavigate(index)}
                            >
                                <Link to={value.link}>{value.title}</Link>
                            </li>
                        );
                    })}
                </ul>

                <Action />
            </div>
        </div>
    );
}

export default Header;

import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';
import {} from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

import styles from './Header.module.scss';
import Search from './Search';
import Input from '~/components/Input';
import Button from '~/components/Button';
import logo from '~/assets/img/logo.png';
import config from '~/config';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('header')}>
            <div className={cx('inner')}>
                <Link to={config.routes.HOME} className={cx('logo-link')}>
                    <img src={logo} alt="NoImage" />
                </Link>

                <Search />

                <div className="navigation">navigation</div>

                <div className={cx('action')}>action</div>
            </div>
        </div>
    );
}

export default Header;

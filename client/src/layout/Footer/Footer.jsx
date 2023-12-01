import classNames from 'classnames/bind';

import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import logo from '~/assets/img/logo.png';
import config from '~/config';

const cx = classNames.bind(styles);

const inforFooter = [
    { title: 'About website', item: ['Introduce', 'Rules', 'Security'] },
    { title: 'Support', item: ['User manual', 'Customer area', 'Respond to complain', 'Contact'] },
    { title: 'Social media', item: ['Facebook', 'Youtube', 'Tiktok', 'Instagram'] },
];

function Footer() {
    return (
        <div className={cx('footer')}>
            {inforFooter.map((item) => {
                return (
                    <div className={cx('list-item')}>
                        <span className={cx('list-title')}>{item.title}</span>
                        <ul className={cx('container-list')}>
                            {item.item.map((itemList) => {
                                return (
                                    <li className={cx('item')}>
                                        <Link>{itemList}</Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                );
            })}
            <Link to={config.routes.HOME} className={cx('logo-link')}>
                <img src={logo} alt="NoImage" />
            </Link>
        </div>
    );
}

export default Footer;

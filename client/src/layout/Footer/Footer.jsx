import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import logo from '~/assets/img/logo.png';
import config from '~/config';

const cx = classNames.bind(styles);

function Footer() {
    const { t } = useTranslation('translation', { keyPrefix: 'Footer' });

    const inforFooter = [
        { title: t('about_website'), item: [t('introduce'), t('rules'), t('security')] },
        { title: t('support'), item: [t('user_manual'), t('customer_area'), t('respond_to_complain'), t('contact')] },
        { title: t('social_media'), item: ['Facebook', 'Youtube', 'Tiktok', 'Instagram'] },
    ];
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

import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import logo from '~/assets/img/logo.png';
import Image from '~/components/Image';
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
            {inforFooter.map((item, indexItem) => {
                return (
                    <div className={cx('list-item')} key={indexItem}>
                        <span className={cx('list-title')}>{item.title}</span>
                        <ul className={cx('container-list')}>
                            {item.item.map((itemList, indexItemList) => {
                                return (
                                    <li className={cx('item')} key={indexItemList}>
                                        <Link>{itemList}</Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                );
            })}
            <Link to={config.routes.HOME} className={cx('logo-link')}>
                <Image src={logo} />
            </Link>
        </div>
    );
}

export default Footer;

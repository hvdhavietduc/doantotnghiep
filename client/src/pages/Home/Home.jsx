import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './Home.module.scss';
import imgHome from '~/assets/img/Home.png';

const cx = classNames.bind(styles);

function Home() {
    const { t } = useTranslation('translation', { keyPrefix: 'Home' });
    return (
        <div className={cx('wrapper')}>
            <div className={cx('containerHome')}>
                <div className={cx('text')}>
                    <div className={cx('title')}>{t('title')}</div>
                    <div className={cx('content')}>{t('content')}</div>
                </div>
                <div className={cx('image-home')}>
                    <img alt="abc" src={imgHome} />
                </div>
            </div>
        </div>
    );
}

export default Home;

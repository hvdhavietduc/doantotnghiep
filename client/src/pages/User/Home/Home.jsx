import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './Home.module.scss';
import imgHome from '~/assets/img/Home.png';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function Home() {
    const { t } = useTranslation('translation', { keyPrefix: 'Home' });
    return (
        <div className={cx('bg-indigo-900 px-[120px] py-[160px]')}>
            <div className={cx('flex flex-wrap', 'max-xl:flex-col-reverse')}>
                <div className={cx('flex-[1.5]', 'text')}>
                    <div className={cx('mb-5 text-2xl font-semibold')}>{t('title')}</div>
                    <div className={cx('text-justify')}>{t('content')}</div>
                </div>
                <div
                    className={cx('flex flex-1 translate-y-[-20px] items-center justify-end', 'max-xl:!justify-center')}
                >
                    <Image className={cx('w-[400px]')} src={imgHome} />
                </div>
            </div>
        </div>
    );
}

export default Home;

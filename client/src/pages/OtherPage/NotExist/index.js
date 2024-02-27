import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './Error.module.scss';

const cx = classNames.bind(styles);

function Error() {
    const { t } = useTranslation('translation', { keyPrefix: 'NotExistedPage' });
    return (
        <div className={cx('flex h-[500px] flex-col items-center justify-center', 'wrapper')}>
            <div className={cx('mb-5 text-9xl text-blue-900')}>404</div>
            <div className={cx('text-5xl font-black text-gray-900')}>{t('you_seem_lost')}</div>
            <div className={cx('text-5xl font-black text-gray-900')}>
                {t('the_page_you_are_trying_to_reach_not_exist')}
            </div>
        </div>
    );
}

export default Error;

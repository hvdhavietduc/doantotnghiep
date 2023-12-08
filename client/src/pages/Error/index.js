import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './Error.module.scss';

const cx = classNames.bind(styles);

function Error() {
    const { t } = useTranslation('translation', { keyPrefix: 'NotExistedPage' });
    return (
        <div className={cx('wrapper')}>
            <div className={cx('text-blue-900 text-9xl mb-5')}>404</div>
            <div className={cx('text-gray-900 text-5xl font-black')}>{t('you_seem_lost')}</div>
            <div className={cx('text-gray-900 text-5xl font-black')}>
                {t('the_page_you_are_trying_to_reach_not_exist')}
            </div>
        </div>
    );
}

export default Error;

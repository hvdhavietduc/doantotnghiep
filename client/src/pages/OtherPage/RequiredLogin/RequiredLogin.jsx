import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

import styles from './RequiredLogin.module.scss';

const cx = classNames.bind(styles);

function RequiredLogin() {
    const { t } = useTranslation('translation', { keyPrefix: 'OtherPage' });
    return (
        <div className={cx('flex justify-center text-xl ', 'wrapper')}>
            <div className={cx('w-full border-l-2 border-l-black bg-amber-100 px-4 py-3 text-amber-600')}>
                <FontAwesomeIcon className={cx('pr-2')} icon={faTriangleExclamation} />
                {t('requires_login')}
            </div>
        </div>
    );
}

export default RequiredLogin;

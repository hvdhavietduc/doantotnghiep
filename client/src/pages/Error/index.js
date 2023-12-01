import classNames from 'classnames/bind';

import styles from './Error.module.scss';

const cx = classNames.bind(styles);

function Error() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('text-blue-900 text-9xl mb-5')}>404</div>
            <div className={cx('text-gray-900 text-5xl font-black')}>You seem lost</div>
            <div className={cx('text-gray-900 text-5xl font-black')}>
                The page you are trying to reach doesn't exist
            </div>
        </div>
    );
}

export default Error;

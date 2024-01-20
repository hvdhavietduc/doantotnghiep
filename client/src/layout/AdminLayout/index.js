import classNames from 'classnames/bind';

import styles from './AdminLayout.module.scss';
import Header from '../Header/HeaderAdmin';

const cx = classNames.bind(styles);

function AdminLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default AdminLayout;

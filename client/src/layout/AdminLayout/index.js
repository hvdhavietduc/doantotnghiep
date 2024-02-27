import classNames from 'classnames/bind';

import styles from './AdminLayout.module.scss';
import Header from '../Header/HeaderAdmin';

const cx = classNames.bind(styles);

function AdminLayout({ children }) {
    return (
        <div className={cx('relative flex min-h-screen flex-col')}>
            <Header />
            <div className={cx('flex w-full justify-center p-[10px]', 'content')}>{children}</div>
        </div>
    );
}

export default AdminLayout;

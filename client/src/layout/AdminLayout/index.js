import classNames from 'classnames/bind';

import styles from './AdminLayout.module.scss';
import Header from '../Header/HeaderAdmin';
import Breadcrumb from '~/components/Breadcrumb';

const cx = classNames.bind(styles);

function AdminLayout({ children, listBreadcrumb }) {
    return (
        <div className={cx('relative flex min-h-screen flex-col')}>
            <Header listBreadcrumb={listBreadcrumb} />
            <div className={cx(`flex w-full justify-center ${listBreadcrumb ? 'pt-[30px]' : ''} p-[10px]`, 'content')}>
                {children}
            </div>
        </div>
    );
}

export default AdminLayout;

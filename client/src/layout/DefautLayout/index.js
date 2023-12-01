import classNames from 'classnames/bind';

import styles from './DefautLayout.module.scss';
import Header from '../Header';
import Footer from '../Footer';

const cx = classNames.bind(styles);

function DefautLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('content')}>{children}</div>
            <Footer />
        </div>
    );
}

export default DefautLayout;

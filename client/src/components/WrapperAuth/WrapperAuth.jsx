import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

import styles from './WrapperAuth.scss';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function WrapperAuth({ title, children, verifyPage }) {
    return (
        <div className={cx('WrapperAuth')}>
            <div className={cx('wave wave1')}></div>
            <div className={cx('wave wave2')}></div>
            <div className={cx('wave wave3')}></div>
            <div className={cx('wave wave4')}></div>
            <div className={cx('container')}>
                <div className={cx('title')}>{title}</div>
                <div className={cx('form')}>{children}</div>
                <footer className={cx('footer')}>
                    <FontAwesomeIcon icon={faArrowLeftLong} />
                    {verifyPage ? (
                        <Link to={config.routes.LOGIN}>Back to Login page</Link>
                    ) : (
                        <Link to={config.routes.HOME}>Back to home page</Link>
                    )}
                </footer>
            </div>
        </div>
    );
}

WrapperAuth.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default WrapperAuth;

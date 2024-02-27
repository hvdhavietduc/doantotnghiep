import PropTypes from 'prop-types';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function Header({ title, onBack }) {
    return (
        <header className={cx('relative mt-[-8px] h-[50px] flex-shrink-0')}>
            <button className={cx('h-full w-[50px] cursor-pointer bg-transparent')} onClick={onBack}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <h4 className={cx('absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] ')}>{title}</h4>
        </header>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired,
};

export default Header;

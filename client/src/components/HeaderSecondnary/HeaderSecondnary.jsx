import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './HeaderSecondnary.module.scss';
import Button from '../Button';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function HeaderSecondnary({ iconTitle, title, backgroundColor, menuFilter, onChange = defaultFn }) {
    const [indexFilter, setIndexFilder] = useState(0);
    const styles = {
        background: 'linear-gradient(' + backgroundColor[0] + ',' + backgroundColor[1] + ')',
    };

    const handleFilter = (item, index) => {
        setIndexFilder(index);
        onChange(item);
    };
    return (
        <div className={cx('wrapper')} style={styles}>
            <div className={cx('title')}>
                <FontAwesomeIcon icon={iconTitle} className={cx('icon')} />
                <span className={cx('content')}>{title}</span>
            </div>
            <div className={cx('menu')}>
                {menuFilter.map((item, index) => (
                    <Button
                        key={index}
                        className={cx('mr-5 py-1 px-4', 'btn-filter', { 'btn-active': indexFilter === index })}
                        rounded
                        onClick={() => handleFilter(item, index)}
                    >
                        {item.title}
                    </Button>
                ))}
            </div>
        </div>
    );
}

HeaderSecondnary.propTypes = {
    iconTitle: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    backgroundColor: PropTypes.array.isRequired,
    menuFilter: PropTypes.array.isRequired,
    onChange: PropTypes.func,
};

export default HeaderSecondnary;

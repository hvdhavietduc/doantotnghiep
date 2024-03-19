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

    const handleFilter = (index) => {
        setIndexFilder(index);
        onChange(index);
    };

    return (
        <div className={cx('relative h-auto w-full pb-5 pt-10', 'wrapper')} style={styles}>
            <div className={cx('text-3xl', 'title')}>
                <FontAwesomeIcon icon={iconTitle} className={cx('mr-3', 'icon')} />
                <span className={cx('font-semibold')}>{title}</span>
            </div>
            <div className={cx('mt-10 flex flex-wrap gap-3 overflow-x-auto')}>
                {menuFilter.map((item, index) => (
                    <Button
                        key={index}
                        className={cx('mr-5 px-4 py-1', 'btn-filter', {
                            'btn-active': indexFilter === index,
                        })}
                        rounded
                        onClick={() => handleFilter(index)}
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

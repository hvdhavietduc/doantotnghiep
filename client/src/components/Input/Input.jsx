import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import styles from './Input.module.scss';

const cx = classNames.bind(styles);

const Input = forwardRef(({ label, round, large, type, className, errolMesseage, ...passProps }, ref) => {
    const Props = { ...passProps };

    const classes = cx('wrapper', {
        round,
        large,
        [className]: className,
    });

    return (
        <div className={classes}>
            {label && <label className={cx('label')}>{label}</label>}
            <input type={type || 'text'} ref={ref} {...Props} />
            {errolMesseage && <span className={cx('messeage')}>{errolMesseage}</span>}
        </div>
    );
});

Input.propTypes = {
    label: PropTypes.string,
    round: PropTypes.bool,
    large: PropTypes.bool,
    type: PropTypes.string,
    className: PropTypes.string,
    data: PropTypes.string,
    setData: PropTypes.func,
};

export default Input;

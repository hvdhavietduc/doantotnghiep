import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import styles from './Input.module.scss';

const cx = classNames.bind(styles);

const Input = forwardRef(({ label, type, textArea, className, errolMesseage, ...passProps }, ref) => {
    const Props = { ...passProps };

    const classes = cx('relative mb-5', 'wrapper', {
        [className]: className,
    });

    return (
        <div className={classes}>
            {label && <label className={cx('mt-1 block font-medium')}>{label}</label>}
            {textArea ? (
                <textarea
                    className={cx(
                        'h-16 w-full overflow-auto rounded px-4 pt-[3px] outline outline-1 outline-slate-300 focus-visible:outline-2 focus-visible:outline-sky-400',
                    )}
                    ref={ref}
                    {...Props}
                ></textarea>
            ) : (
                <input
                    className={cx(
                        'h-[35px] w-full rounded px-4 outline outline-1 outline-slate-300 focus-visible:outline-2 focus-visible:outline-sky-400',
                    )}
                    type={type || 'text'}
                    ref={ref}
                    {...Props}
                />
            )}

            {errolMesseage && <span className={cx('text-sm text-red-600')}>{errolMesseage}</span>}
        </div>
    );
});

Input.propTypes = {
    label: PropTypes.string,
    textArea: PropTypes.bool,
    type: PropTypes.string,
    className: PropTypes.string,
    data: PropTypes.string,
    setData: PropTypes.func,
};

export default Input;

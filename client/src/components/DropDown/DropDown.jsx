import PropTypes from 'prop-types';
import { useRef } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import { Wrapper as PopperWrapper } from '~/components/Popper';

import styles from './DropDown.module.scss';

const cx = classNames.bind(styles);

function DropDown({ children, handleChange = () => {}, data, className, showResult, setShowResult }) {
    const boxSearchRef = useRef();
    const styleTagSearchResult = { width: boxSearchRef.current?.clientWidth };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const classes = cx({
        [className]: className,
    });
    return (
        // Using a wrapper <div> tag around the reference element solves
        // this by creating a new parentNode context.
        <div ref={boxSearchRef} className={classes}>
            <HeadlessTippy
                placement="bottom"
                interactive
                visible={showResult && data.length > 0}
                render={(attrs) => (
                    <div className={cx('h-20')} style={styleTagSearchResult} tabIndex="-1" {...attrs}>
                        <PopperWrapper className={cx('z-20 max-h-[150px] overflow-y-auto pb-2')}>
                            {data.map((item, index) => (
                                <div
                                    key={index}
                                    className={cx('cursor-pointer px-4 py-[6px] hover:underline', 'result-item')}
                                    onClick={() => handleChange(item)}
                                >
                                    {item}
                                </div>
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                {children}
            </HeadlessTippy>
        </div>
    );
}

DropDown.propTypes = {
    children: PropTypes.node.isRequired,
    handleChange: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    className: PropTypes.string,
    showResult: PropTypes.bool.isRequired,
    setShowResult: PropTypes.func.isRequired,
};

export default DropDown;

import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Button.module.scss';
const cx = classNames.bind(styles);

function Button({ children, primary, red, rounded, leftIcon, rightIcon, className, to, href, ...passProps }) {
    let Comp = 'button';

    let Props = {
        ...passProps,
    };

    if (to) {
        Props.to = to;
        Comp = Link;
    } else if (href) {
        Props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', 'rounded border-0 flex items-center justify-center font-semibold py-1', {
        primary,
        red,
        '!rounded-full': rounded,
        [className]: className,
    });

    return (
        <Comp className={classes} {...Props}>
            {leftIcon && <FontAwesomeIcon className={cx('mr-2 w-4')} icon={leftIcon} />}
            {children}
            {rightIcon && <FontAwesomeIcon className={cx('ml-2 w-4')} icon={rightIcon} />}
        </Comp>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    primary: PropTypes.bool,
    red: PropTypes.bool,
    rounded: PropTypes.bool,
    leftIcon: PropTypes.object,
    rightIcon: PropTypes.object,
    className: PropTypes.string,
    to: PropTypes.string,
    href: PropTypes.string,
};

export default Button;

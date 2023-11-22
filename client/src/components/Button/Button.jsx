import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Button.module.scss';
const cx = classNames.bind(styles);

function Button({
    children,
    primary,
    red,
    borderDark,
    borderPrimary,
    rounded,
    leftIcon,
    rightIcon,
    className,
    to,
    href,
    ...passProps
}) {
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

    const classes = cx('wrapper', {
        primary,
        red,
        borderDark,
        borderPrimary,
        rounded,
        [className]: className,
    });

    return (
        <Comp className={classes} {...Props}>
            {leftIcon && <FontAwesomeIcon className={cx('leftIcon')} icon={leftIcon} />}
            {children}
            {rightIcon && <FontAwesomeIcon className={cx('rightIcon')} icon={leftIcon} />}
        </Comp>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    primary: PropTypes.bool,
    red: PropTypes.bool,
    borderDark: PropTypes.bool,
    borderPrimary: PropTypes.bool,
    rounded: PropTypes.bool,
    leftIcon: PropTypes.object,
    rightIcon: PropTypes.object,
    className: PropTypes.string,
    to: PropTypes.string,
    href: PropTypes.string,
};

export default Button;

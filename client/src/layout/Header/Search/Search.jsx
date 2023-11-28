import classNames from 'classnames/bind';

import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    return <div className={cx('search')}>Search</div>;
}

export default Search;

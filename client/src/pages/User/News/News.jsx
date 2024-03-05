import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './News.module.scss';

const cx = classNames.bind(styles);

function News() {
    // eslint-disable-next-line no-unused-vars
    const { t } = useTranslation('translation', { keyPrefix: 'News' });
    return <div className={cx('bg-indigo-900 px-[120px] py-[160px]')}>News</div>;
}

export default News;

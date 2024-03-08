import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './News.module.scss';
import HeaderSecondnary from '~/components/HeaderSecondnary';
import ItemNews from './ItemNews';
import Pagination from '~/components/Pagination';
import config from '~/config';

const cx = classNames.bind(styles);

function News() {
    // eslint-disable-next-line no-unused-vars
    const { t } = useTranslation('translation', { keyPrefix: 'News' });

    const onPageChange = () => {};

    const paramater = config.getParamaterHeaderSecondnary().News;
    return (
        <div className={cx('mb-[40px] w-full')}>
            <HeaderSecondnary
                iconTitle={paramater.iconTitle}
                title={paramater.title}
                backgroundColor={paramater.backgroundColor}
                menuFilter={paramater.menuFilter}
            />
            <div className={cx('mt-[50px] grid w-full grid-cols-4  gap-y-14 px-[160px]', 'wrapper')}>
                <ItemNews />
                <ItemNews />
                <ItemNews />
                <ItemNews />
                <ItemNews />
                <ItemNews />
                <ItemNews />
                <ItemNews />
                <ItemNews />
                <ItemNews />
                <ItemNews />
                <ItemNews />
            </div>
            <div>
                <Pagination totalPage={10} currentPage={2} onPageChange={onPageChange} />
            </div>
        </div>
    );
}

export default News;

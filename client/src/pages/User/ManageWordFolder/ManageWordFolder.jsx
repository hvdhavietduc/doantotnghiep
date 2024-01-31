import { useEffect, useState } from 'react';
import Loading from '~/components/Loading';
import styles from './ManageWordFolder.module.scss';
import classNames from 'classnames/bind';

import { useTranslation } from 'react-i18next';
import Button from '~/components/Button';
import ItemWord from './ItemWord';
import Pagination from '~/components/Pagination';

const cx = classNames.bind(styles);

function ManageWordFolder() {
    const [loading, setLoading] = useState(false);

    const { t } = useTranslation('translation', { keyPrefix: 'ManageWordFolder' });

    return (
        <div className={cx('ManageWordFolder')}>
            <div className={cx('inner')}>
                <div className={cx('header')}>
                    <div className={cx('nameFolder')}>
                        Folder: <span>Communicate</span>
                    </div>
                    <Button primary className={cx('btn-add')}>
                        {t('add_new_word')}
                    </Button>
                </div>
                <div className={cx('content')}>
                    {/* <div className={cx('not-have-word')}>There are no vocabulary words in this folder yet</div> */}
                    <div className={cx('have-word')}>
                        <div className={cx('header-content')}></div>
                        <div className={cx('list-word')}>
                            <ItemWord />
                            <ItemWord />
                            <ItemWord />
                        </div>
                    </div>
                </div>
                <div className={cx('pagination')}>
                    <Pagination totalPage={10} currentPage={1} onPageChange={() => {}} />
                </div>
            </div>
            {loading && <Loading />}
        </div>
    );
}

export default ManageWordFolder;

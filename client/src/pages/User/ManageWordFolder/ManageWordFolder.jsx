import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './ManageWordFolder.module.scss';
import ItemWord from './ItemWord';
import AddWord from './AddWord';
import Button from '~/components/Button';
import Pagination from '~/components/Pagination';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);

function ManageWordFolder() {
    const [listWord, setListWord] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isPoperAddWord, setIsPoperAddWord] = useState(false);
    const [totalPage, setTotalPage] = useState(1);
    const [isDeleteorEdit, setIsDeleteorEdit] = useState(false);

    const location = useLocation();
    const currentPath = location.pathname;
    const currentPage = Number(currentPath.split('/')[4]);

    const { t } = useTranslation('translation', { keyPrefix: 'ManageWordFolder' });

    const showPoperAddWord = () => {
        setIsPoperAddWord(true);
        document.body.style.overflow = 'hidden';
    };

    const onPageChange = (value, isChanged = false) => {
        //(updateCurrentPage(value));
        if (isChanged === true) {
            setIsDeleteorEdit(true);
        }
        //(config.routes.wordbooks.WORDBOOK + `/${value}`);
    };

    return (
        <div className={cx('ManageWordFolder')}>
            <div className={cx('inner')}>
                <div className={cx('header')}>
                    <div className={cx('nameFolder')}>
                        Folder: <span>Communicate</span>
                    </div>
                    <Button primary className={cx('btn-add')} onClick={showPoperAddWord}>
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
                    <Pagination totalPage={totalPage} currentPage={currentPage} onPageChange={() => {}} />
                </div>
            </div>
            {isPoperAddWord && (
                <AddWord setIsPoperAddWord={setIsPoperAddWord} onPageChange={onPageChange} setListWord={setListWord} />
            )}
            {loading && <Loading />}
        </div>
    );
}

export default ManageWordFolder;

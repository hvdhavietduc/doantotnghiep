import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';

import styles from './ManageWordFolder.module.scss';
import ItemWord from './ItemWord';
import AddWord from './AddWord';
import Button from '~/components/Button';
import Pagination from '~/components/Pagination';
import Loading from '~/components/Loading';
import { getWordAllByIdFolder } from '~/services/folderService';
import { updatecCurrentPageWordInFolder } from '~/redux/wordBooksSlice';
import notify from '~/utils/notify';
import config from '~/config';

const cx = classNames.bind(styles);

function ManageWordFolder() {
    const [loading, setLoading] = useState(false);
    const [isPoperAddWord, setIsPoperAddWord] = useState(false);
    const [listWord, setListWord] = useState([]);
    const [isDeleteorEdit, setIsDeleteorEdit] = useState(false);
    const [totalPage, setTotalPage] = useState(1);
    const [totalWord, setTotalWord] = useState();
    const [nameFolder, setNameFolder] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useTranslation('translation', { keyPrefix: 'ManageWordFolder' });
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookies] = useCookies(['token']);

    const currentPath = location.pathname;
    const currentPage = Number(currentPath.split('/')[4]);
    const folderId = String(currentPath.split('/')[3]);

    const showPoperAddWord = () => {
        setIsPoperAddWord(true);
        document.body.style.overflow = 'hidden';
    };

    const onPageChange = (value, isChanged = false) => {
        updatecCurrentPageWordInFolder(value);
        if (isChanged === true) {
            setIsDeleteorEdit(true);
        }
        const index = currentPath.lastIndexOf('/');
        const pathToPageChanged = currentPath.slice(0, index + 1) + String(value);
        navigate(pathToPageChanged);
    };

    useEffect(() => {
        setLoading(true);
        const token = cookies.token;
        getWordAllByIdFolder(token, folderId, currentPage - 1, listWord.size)
            .then((result) => {
                setLoading(false);
                setListWord(result.words);
                setNameFolder(result.folder);
                setTotalPage(result.totalPage);
                setTotalWord(result.total);
                setIsDeleteorEdit(false);
                return;
            })
            .catch((error) => {
                setLoading(false);
                const messeageNotify = config.errorMesseage.getMesseageNotify();
                if (!error.response) {
                    notify.error(messeageNotify.ERROR_NETWORD);
                    return;
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, isDeleteorEdit]);

    return (
        <div className={cx('mt-[80px] flex w-full justify-center')}>
            <div className={cx('w-[600px]')}>
                <div className={cx('flex w-full justify-start')}>
                    <div className={cx('mr-6 text-xl font-semibold')}>
                        Folder: <span>{nameFolder}</span>
                    </div>
                    <Button primary className={cx('px-[6px] py-0')} onClick={showPoperAddWord}>
                        {t('add_new_word')}
                    </Button>
                </div>
                <div className={cx('mt-[35px]')}>
                    {totalWord === 0 ? (
                        <div>{t('no_have_word')}</div>
                    ) : (
                        <div>
                            <div className={cx('mb-5')}>
                                {t('list_have') + ' '}
                                {totalWord}
                                {' ' + t('word')}.
                            </div>
                            <div>
                                {listWord.map((word, index) => (
                                    <ItemWord key={index} inforWord={word} onPageChange={onPageChange} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    <Pagination totalPage={totalPage} currentPage={currentPage} onPageChange={onPageChange} />
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

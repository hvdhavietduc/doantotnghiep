import classNames from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import styles from './Wordbooks.module.scss';
import HeaderSecondnary from '~/components/HeaderSecondnary';
import Loading from '~/components/Loading';
import Itembox from './Itembox';
import CreateFolder from './CreateFolder';
import { getFolderAll } from '~/services/folderService';
import { updateCurrentPage } from '~/redux/wordBooksSlice';
import notify from '~/utils/notify';
import config from '~/config';
import Pagination from '~/components/Pagination';

const cx = classNames.bind(styles);

function Wordbooks() {
    const [listFolder, setListFolder] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isPoperCreateFolder, setIsPoperCreateFolder] = useState(false);
    const [totalPage, setTotalPage] = useState(1);
    const [isDeleteorEdit, setIsDeleteorEdit] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookies] = useCookies(['token']);
    const { t } = useTranslation('translation', { keyPrefix: 'WordBooks' });

    const location = useLocation();
    const currentPath = location.pathname;
    const currentPage = Number(currentPath.split('/')[2]);

    const paramater = config.getParamaterHeaderSecondnary().wordbooks;

    const showPoperCreateFolder = () => {
        setIsPoperCreateFolder(true);
        document.body.style.overflow = 'hidden';
    };

    const onPageChange = (value, isChanged = false) => {
        dispatch(updateCurrentPage(value));
        if (isChanged === true) {
            setIsDeleteorEdit(true);
        }
        navigate(config.routes.wordbooks.WORDBOOK + `/${value}`);
    };

    useEffect(() => {
        setLoading(true);
        const token = cookies.token;
        getFolderAll(token, currentPage - 1, listFolder.size)
            .then((result) => {
                setLoading(false);
                setListFolder(result.folders);
                setTotalPage(result.totalPage);
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
        <Fragment>
            <div className={cx('wordbooks')}>
                <HeaderSecondnary
                    iconTitle={paramater.iconTitle}
                    title={paramater.title}
                    backgroundColor={paramater.backgroundColor}
                    menuFilter={paramater.menuFilter}
                />
                <div className={cx('wrapper')}>
                    <div className={cx('item-box', 'create-folder')} onClick={showPoperCreateFolder}>
                        <FontAwesomeIcon icon={faPlus} />
                        <span className={cx('content')}>{t('create_folder')}</span>
                    </div>
                    {listFolder.map((value, index) => (
                        <Itembox
                            key={index}
                            className={cx('item-box')}
                            nameFolder={value.name}
                            description={value.description}
                            numberWords={value.wordIds?.length}
                            nameAuthor={localStorage.getItem('name')}
                            avatarAuthor={localStorage.getItem('avatar')}
                            idFolder={value.id}
                            onPageChange={onPageChange}
                        />
                    ))}
                </div>
                <div className={cx('pagination')}>
                    <Pagination totalPage={totalPage} currentPage={currentPage} onPageChange={onPageChange} />
                </div>
            </div>
            {isPoperCreateFolder && (
                <CreateFolder
                    setIsPoperCreateFolder={setIsPoperCreateFolder}
                    onPageChange={onPageChange}
                    setListFolder={setListFolder}
                />
            )}
            {loading && <Loading />}
        </Fragment>
    );
}

export default Wordbooks;

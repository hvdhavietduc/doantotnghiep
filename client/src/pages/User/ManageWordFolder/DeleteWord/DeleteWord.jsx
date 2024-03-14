import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';

import styles from './DeleteWord.module.scss';
import Loading from '~/components/Loading';
import PopperConfirm from '~/components/PopperConfirm';
import { deleteWord } from '~/services/folderService';
import notify from '~/utils/notify';
import config from '~/config';

const cx = classNames.bind(styles);

function DeleteWord({ setIsPoperDeleteWord, inforWord, onPageChange }) {
    const [loading, setLoading] = useState(false);

    const { t } = useTranslation('translation', { keyPrefix: 'ManageWordFolder' });
    //eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['token']);
    const { currentPage } = useSelector((state) => state.wordBooks);

    const closePoper = () => {
        setIsPoperDeleteWord(false);
        document.body.style.overflow = 'visible';
    };

    const handleMiddleDeletetFolder = async () => {
        const data = {
            wordId: inforWord.id,
            folderId: inforWord.folderId,
        };
        await deleteWord(data, cookies.token);
        onPageChange(currentPage, true);
        setIsPoperDeleteWord(false);
        document.body.style.overflow = 'visible';
        setLoading(false);
        notify.success(config.manageWordFolder.notification().DELETE_WORD_SUCCESS);
    };

    const handleDeletetFolder = async () => {
        setLoading(true);
        handleMiddleDeletetFolder().catch((error) => {
            setLoading(false);
            const messeageNotify = config.errorMesseage.getMesseageNotify();
            if (!error.response) {
                notify.error(messeageNotify.ERROR_NETWORD);
                return;
            }
        });
    };

    return (
        <Fragment>
            <PopperConfirm onClose={closePoper} onSave={handleDeletetFolder}>
                {t('Are_you_sure_to_delete_word') + ' ['}
                <span className={cx('text-red-600')}> {inforWord.name}</span> {'] ?'}
            </PopperConfirm>

            {loading && <Loading />}
        </Fragment>
    );
}

DeleteWord.propTypes = {
    setIsPoperDeleteWord: PropTypes.func.isRequired,
    inforWord: PropTypes.object.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default DeleteWord;

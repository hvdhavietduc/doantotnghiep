// import classNames from 'classnames/bind';
import { useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';

// import styles from './Delete.module.scss';
import Loading from '~/components/Loading';
import PopperConfirm from '~/components/PopperConfirm';
import { deleteWord } from '~/services/manageWordCategoryServices';
import notify from '~/utils/notify';
import config from '~/config';
import { useLocation } from 'react-router-dom';

// const cx = classNames.bind(styles);

function DeleteWord({ setIsPoperDeleteWOrd, wordId }) {
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const currentPath = location.pathname;
    const categoryId = currentPath.split('/')[2];

    const { t } = useTranslation('translation', { keyPrefix: 'ManageUser' });
    //eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['token']);

    const closePoper = () => {
        setIsPoperDeleteWOrd(false);
        document.body.style.overflow = 'visible';
    };

    const handleMiddleDeletetWord = async () => {
        await deleteWord(cookies.token, categoryId, wordId).then(() => {
            setIsPoperDeleteWOrd(false);
            document.body.style.overflow = 'visible';
            setLoading(false);
            notify.success(config.manageUser.notification().DELETE_USER_SUCCESS);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        });
    };

    const handleDeletetWord = async () => {
        setLoading(true);
        handleMiddleDeletetWord().catch((error) => {
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
            <PopperConfirm onClose={closePoper} onSave={handleDeletetWord}>
                {t('are_you_sure_to_delete_user')}
            </PopperConfirm>

            {loading && <Loading />}
        </Fragment>
    );
}

export default DeleteWord;

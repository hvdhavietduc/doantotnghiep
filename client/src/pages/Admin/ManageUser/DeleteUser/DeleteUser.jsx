// import classNames from 'classnames/bind';
import { useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';

// import styles from './Delete.module.scss';
import Loading from '~/components/Loading';
import PopperConfirm from '~/components/PopperConfirm';
import { deleteUser } from '~/services/userServices';
import notify from '~/utils/notify';
import config from '~/config';

// const cx = classNames.bind(styles);

function DeleteUser({ setIsPoperDeleteUser, userId }) {
    const [loading, setLoading] = useState(false);

    const { t } = useTranslation('translation', { keyPrefix: 'ManageUser' });
    //eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['token']);

    const closePoper = () => {
        setIsPoperDeleteUser(false);
        document.body.style.overflow = 'visible';
    };

    const handleMiddleDeletetUser = async () => {
        await deleteUser(cookies.token, userId).then((result) => {
            setIsPoperDeleteUser(false);
            document.body.style.overflow = 'visible';
            setLoading(false);
            notify.success(config.manageUser.notification().DELETE_USER_SUCCESS);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        });
    };

    const handleDeletetUser = async () => {
        setLoading(true);
        handleMiddleDeletetUser().catch((error) => {
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
            <PopperConfirm onClose={closePoper} onSave={handleDeletetUser}>
                {t('are_you_sure_to_delete_user')}
            </PopperConfirm>

            {loading && <Loading />}
        </Fragment>
    );
}

export default DeleteUser;

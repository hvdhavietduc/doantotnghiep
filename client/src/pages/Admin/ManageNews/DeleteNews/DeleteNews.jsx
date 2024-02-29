// import classNames from 'classnames/bind';
import { useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';

// import styles from './Delete.module.scss';
import Loading from '~/components/Loading';
import PopperConfirm from '~/components/PopperConfirm';
import { deleteNews } from '~/services/manageNewsServices';
import notify from '~/utils/notify';
import config from '~/config';

// const cx = classNames.bind(styles);

function DeleteNews({ setIsPoperDeleteNews, newsId }) {
    const [loading, setLoading] = useState(false);

    const { t } = useTranslation('translation', { keyPrefix: 'ManageNews' });
    //eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['token']);

    const closePoper = () => {
        setIsPoperDeleteNews(false);
        document.body.style.overflow = 'visible';
    };

    const handleMiddleDeletetNews = async () => {
        await deleteNews(cookies.token, newsId).then((result) => {
            setIsPoperDeleteNews(false);
            document.body.style.overflow = 'visible';
            setLoading(false);
            notify.success(config.manageNews.notification().DELETE_NEWS_SUCCESS);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        });
    };

    const handleDeletetNews = async () => {
        setLoading(true);
        const messeageNotifyNews = config.manageNews.errorMesseage.getMesseageNotify();
        handleMiddleDeletetNews().catch((error) => {
            setLoading(false);
            const messeageNotify = config.errorMesseage.getMesseageNotify();
            if (!error.response) {
                notify.error(messeageNotify.ERROR_NETWORD);
                return;
            }

            const { message } = error.response.data;
            const { messeageLogic } = config.manageNews.errorMesseage;
            if (error.response.status === 404 && message.includes(messeageLogic.NEWS_NOT_FOUND)) {
                notify.error(messeageNotifyNews.NEWS_NOT_FOUND);
                return;
            }
            notify.error(error.response.data.message);
            return;
        });
    };

    return (
        <Fragment>
            <PopperConfirm onClose={closePoper} onSave={handleDeletetNews}>
                {t('are_you_sure_to_delete_news')}
            </PopperConfirm>

            {loading && <Loading />}
        </Fragment>
    );
}

export default DeleteNews;

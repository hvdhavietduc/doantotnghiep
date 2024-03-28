// import classNames from 'classnames/bind';
import { useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';

// import styles from './Delete.module.scss';
import Loading from '~/components/Loading';
import PopperConfirm from '~/components/PopperConfirm';
import { deleteVideo } from '~/services/manageVideoServices';
import notify from '~/utils/notify';
import config from '~/config';

// const cx = classNames.bind(styles);

function DeleteVideo({ setIsPoperDeleteVideo, videoId }) {
    const [loading, setLoading] = useState(false);

    const { t } = useTranslation('translation', { keyPrefix: 'ManageVideo' });
    //eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['token']);

    const closePoper = () => {
        setIsPoperDeleteVideo(false);
        document.body.style.overflow = 'visible';
    };

    const handleMiddleDeletetVideo = async () => {
        await deleteVideo(cookies.token, videoId).then((result) => {
            setIsPoperDeleteVideo(false);
            document.body.style.overflow = 'visible';
            setLoading(false);
            notify.success(config.manageVideo.notification().DELETE_VIDEO_SUCCESS);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        });
    };

    const handleDeletetVideo = async () => {
        setLoading(true);
        const messeageNotifyVideo = config.manageVideo.errorMesseage.getMesseageNotify();
        handleMiddleDeletetVideo().catch((error) => {
            setLoading(false);
            const messeageNotify = config.errorMesseage.getMesseageNotify();
            if (!error.response) {
                notify.error(messeageNotify.ERROR_NETWORD);
                return;
            }

            const { message } = error.response.data;
            const { messeageLogic } = config.manageVideo.errorMesseage;
            if (error.response.status === 404 && message.includes(messeageLogic.VIDEO_NOT_FOUND)) {
                notify.error(messeageNotifyVideo.VIDEO_NOT_FOUND);
                return;
            }
            notify.error(error.response.data.message);
            return;
        });
    };

    return (
        <Fragment>
            <PopperConfirm onClose={closePoper} onSave={handleDeletetVideo}>
                {t('are_you_sure_to_delete_video')}
            </PopperConfirm>

            {loading && <Loading />}
        </Fragment>
    );
}

export default DeleteVideo;

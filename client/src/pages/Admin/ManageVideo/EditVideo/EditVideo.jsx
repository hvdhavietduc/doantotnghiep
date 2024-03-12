import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';

import styles from './EditVideo.module.scss';
import PopperForm from '~/components/PopperForm';
import Loading from '~/components/Loading';
import Input from '~/components/Input';
import notify from '~/utils/notify';
import config from '~/config';
import getValid from '../validateForm';
import { editVideo } from '~/services/manageVideoServices';

// eslint-disable-next-line no-unused-vars
const cx = classNames.bind(styles);

function EditVideo({ setIsPoperEditVideo, onPageChange, oldVideo }) {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(oldVideo.title);
    const [description, setDescription] = useState(oldVideo.description);
    const [isKeepOldVideo, setIsKeepOldVideo] = useState(true);
    const { t } = useTranslation('translation', { keyPrefix: 'ManageVideo' });
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['token']);

    const {
        register,
        handleSubmit,
        // eslint-disable-next-line no-unused-vars
        setError,
        formState: { errors },
    } = useForm();

    const valid = getValid();

    const closePoper = () => {
        setIsPoperEditVideo(false);
        document.body.style.overflow = 'visible';
    };

    const handleMiddleEditVideo = async (data) => {
        await editVideo(data, cookies.token);
        await onPageChange(1, true);
        setIsPoperEditVideo(false);
        document.body.style.overflow = 'visible';
        setLoading(false);
        notify.success(config.manageNews.notification().EDIT_NEWS_SUCCESS);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const handleEditVideo = async (formData, e) => {
        e.preventDefault();
        setLoading(true);
        var data = new FormData();
        data.append('id', oldVideo.id);
        data.append('title', formData.title);
        data.append('description', formData.description);
        if (!isKeepOldVideo) {
            data.append('video', formData.video[0]);
        }
        data.append('isKeepVideo', formData.isKeepOldVideo);

        const messeageNotify = config.manageVideo.errorMesseage.getMesseageNotify();
        handleMiddleEditVideo(data).catch((error) => {
            setLoading(false);

            if (!error.response) {
                notify.error(messeageNotify.ERROR_NETWORD);
                return;
            }

            const { message } = error.response.data;
            const { messeageLogic } = config.manageVideo.errorMesseage;
            if (error.response.status === 404 && message.includes(messeageLogic.VIDEO_NOT_FOUND)) {
                notify.error(messeageNotify.VIDEO_NOT_FOUND);
                return;
            } else if (message === messeageLogic.FILE_NOT_VIDEO) {
                notify.error(messeageNotify.FILE_NOT_VIDEO);
                return;
            }
            notify.error(error.response.data.message);
            return;
        });
    };
    return (
        <Fragment>
            <PopperForm
                onClose={closePoper}
                onSave={handleEditVideo}
                handleSubmitForm={handleSubmit}
                title={t('edit_video')}
            >
                <Input
                    name={'title'}
                    label={t('title')}
                    {...register('title', valid.title)}
                    errolMesseage={errors.title?.message}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                    name={'description'}
                    label={t('description')}
                    {...register('description', valid.description)}
                    errolMesseage={errors.definition?.message}
                    textArea={true}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="checkbox"
                    checked={isKeepOldVideo}
                    className=" h-4 w-4"
                    onClick={() => {
                        setIsKeepOldVideo(!isKeepOldVideo);
                    }}
                    {...register('isKeepOldVideo')}
                />{' '}
                <span>{t('keep_old_video')}</span>
                {!isKeepOldVideo && (
                    <Input
                        name={'video'}
                        label={t('video')}
                        {...register('video', valid.video)}
                        errolMesseage={errors.definition?.message}
                        type="file"
                    />
                )}
            </PopperForm>
            {loading && <Loading />}
        </Fragment>
    );
}

EditVideo.propTypes = {
    setIsPoperEditNews: PropTypes.func.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default EditVideo;

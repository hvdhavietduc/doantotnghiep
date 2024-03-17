import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';

import PopperForm from '~/components/PopperForm';
import Loading from '~/components/Loading';
import Input from '~/components/Input';
import notify from '~/utils/notify';
import config from '~/config';
import getValid from '../validateForm';
import { createVideo } from '~/services/manageVideoServices';

function AddVideo({ setIsPoperAddVideo, onPageChange }) {
    const [loading, setLoading] = useState(false);

    const { t } = useTranslation('translation', { keyPrefix: 'ManageVideo' });
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['token']);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();

    const valid = getValid();

    const closePoper = () => {
        setIsPoperAddVideo(false);
        document.body.style.overflow = 'visible';
    };

    const handleMiddleCreateVideo = async (data) => {
        await createVideo(data, cookies.token);
        await onPageChange(1, true);
        setIsPoperAddVideo(false);
        document.body.style.overflow = 'visible';
        setLoading(false);
        notify.success(config.manageVideo.notification().ADD_VIDEO_SUCCESS);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const handleCreateVideo = async (formData, e) => {
        e.preventDefault();
        setLoading(true);
        var data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('video', formData.video[0]);

        const messeageNotify = config.manageVideo.errorMesseage.getMesseageNotify();
        handleMiddleCreateVideo(data).catch((error) => {
            setLoading(false);

            if (!error.response) {
                notify.error(messeageNotify.ERROR_NETWORD);
                return;
            }

            const { message } = error.response.data;
            const { messeageLogic } = config.manageVideo.errorMesseage;

            if(message === messeageLogic.FILE_NOT_VIDEO){
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
                onSave={handleCreateVideo}
                handleSubmitForm={handleSubmit}
                title={t('add_video')}
            >
                <Input
                    name={'title'}
                    label={t('title')}
                    {...register('title', valid.title)}
                    errolMesseage={errors.title?.message}
                />
                <Input
                    name={'description'}
                    label={t('description')}
                    {...register('description', valid.description)}
                    errolMesseage={errors.definition?.message}
                    textArea={true}
                />
                <Input
                    name={'video'}
                    label={t('video')}
                    {...register('video')}
                    errolMesseage={errors.definition?.message}
                    type='file'
                />
            </PopperForm>
            {loading && <Loading />}
        </Fragment>
    );
}

AddVideo.propTypes = {
    setIsPoperAddVideo: PropTypes.func.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default AddVideo;

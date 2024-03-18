import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useState, Fragment, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { createPost } from '~/services/forumService';
import PopperForm from '~/components/PopperForm';
import Loading from '~/components/Loading';
import Input from '~/components/Input';
import notify from '~/utils/notify';
import config from '~/config';
import getValid from '../validateForm';
import { createPostReducer } from '~/redux/myPostSlice';
import { createPostReducer as createPostForumReducer } from '~/redux/allPostForumSlice';
import handleError from '~/config/handleError';

function CreatePost({ setIsPoperCreatePost, onPageChange }) {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);

    const { t } = useTranslation('translation', { keyPrefix: 'Forum' });
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['token']);
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();

    const valid = getValid();

    const closePoper = () => {
        setIsPoperCreatePost(false);
        document.body.style.overflow = 'visible';
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleMiddleCreatePost = async (data) => {
        const token = cookies.token;
        await createPost(data, token).then((res) => {
            dispatch(createPostReducer(res));
            dispatch(createPostForumReducer(res));
        });
        setIsPoperCreatePost(false);
        document.body.style.overflow = 'visible';
        setLoading(false);
        notify.success(t('add_post_success'));
    };

    const handleCreatePost = async (formData, e) => {
        e.preventDefault();
        setLoading(true);

        var data = new FormData();
        data.append('title', formData.title);
        data.append('content', formData.content);
        data.append('image', fileInputRef.current.files[0] ?? null);

        const messeageNotify = config.forum.errorMesseage.getMesseageNotify();
        handleMiddleCreatePost(data).catch((error) => {
            setLoading(false);
            if (!error.response) {
                notify.error(messeageNotify.ERROR_NETWORD);
                return;
            }
            const { message } = error.response.data;
            const configLogic = config.forum;

            handleError(configLogic, message);
        });
    };

    const handleImageRemove = () => {
        setImage(null);
        fileInputRef.current.value = null;
    };

    return (
        <Fragment>
            <PopperForm
                onClose={closePoper}
                onSave={handleCreatePost}
                handleSubmitForm={handleSubmit}
                title={t('add_post')}
            >
                <Input
                    name={'title'}
                    label={t('title')}
                    {...register('title', valid.title)}
                    errolMesseage={errors.title?.message}
                />
                <Input
                    name={'content'}
                    label={t('content')}
                    textArea
                    {...register('content', valid.description)}
                    errolMesseage={errors.description?.message}
                />
                <Input
                    name={'image'}
                    label={t('image')}
                    {...register('image')}
                    type="file"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                />
                {image && (
                    <div className=" relative pb-3">
                        <img src={image} alt="Preview" className="h-full w-full" />
                        <button
                            className="absolute right-[10px] top-[10px] h-12 w-12 rounded-full bg-slate-200 p-2 text-2xl font-semibold text-white hover:bg-slate-300"
                            onClick={handleImageRemove}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                )}
            </PopperForm>
            {loading && <Loading />}
        </Fragment>
    );
}

CreatePost.propTypes = {
    setIsPoperCreatePost: PropTypes.func.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default CreatePost;

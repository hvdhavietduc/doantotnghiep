import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useState, Fragment, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { editPost } from '~/services/forumService';
import PopperForm from '~/components/PopperForm';
import Loading from '~/components/Loading';
import Input from '~/components/Input';
import notify from '~/utils/notify';
import config from '~/config';
import getValid from '../validateForm';
import handleError from '~/config/handleError';
import { editPostReducer } from '~/redux/myPostSlice';
import { editPostReducer as editPostForumReducer } from '~/redux/allPostForumSlice';

function EditPost({ setIsPoperEditPost, oldPost }) {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(oldPost.image);
    const [title, setTitle] = useState(oldPost.title);
    const [content, setContent] = useState(oldPost.content);

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
        setIsPoperEditPost(false);
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

    const handleMiddleEditPost = async (data) => {
        const token = cookies.token;
        await editPost(data, token).then((res) => {
            dispatch(editPostReducer(res));
            dispatch(editPostForumReducer(res));
        });
        setIsPoperEditPost(false);
        document.body.style.overflow = 'visible';
        setLoading(false);
        notify.success(t('edit_post_success'));
    };

    const handleEditPost = async (formData, e) => {
        e.preventDefault();
        setLoading(true);

        var data = new FormData();
        data.append('id', oldPost.id);
        data.append('title', formData.title);
        data.append('content', formData.content);
        if (fileInputRef) {
            data.append('keepOldImage', false);
            data.append('image', fileInputRef.current.files[0] ?? null);
        } else {
            data.append('keepOldImage', true);
            data.append('image', null);
        }
        const messeageNotify = config.forum.errorMesseage.getMesseageNotify();
        handleMiddleEditPost(data).catch((error) => {
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
                onSave={handleEditPost}
                handleSubmitForm={handleSubmit}
                title={t('edit_post')}
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
                    name={'content'}
                    label={t('content')}
                    textArea
                    {...register('content', valid.description)}
                    errolMesseage={errors.description?.message}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
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

EditPost.propTypes = {
    setIsPoperEditPost: PropTypes.func.isRequired,
    oldPost: PropTypes.func.isRequired,
};

export default EditPost;

import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';

import styles from './EditNews.module.scss';
import PopperForm from '~/components/PopperForm';
import Loading from '~/components/Loading';
import Input from '~/components/Input';
import notify from '~/utils/notify';
import config from '~/config';
import getValid from '../validateForm';
import { editNews } from '~/services/manageNewsServices';

// eslint-disable-next-line no-unused-vars
const cx = classNames.bind(styles);

function EditNews({ setIsPoperEditNews, onPageChange, oldNews }) {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(oldNews.title);
    const [content, setContent] = useState(oldNews.content);
    const { t } = useTranslation('translation', { keyPrefix: 'ManageNews' });
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
        setIsPoperEditNews(false);
        document.body.style.overflow = 'visible';
    };

    const handleMiddleEditNews = async (data) => {
        await editNews(data, cookies.token);
        await onPageChange(1, true);
        setIsPoperEditNews(false);
        document.body.style.overflow = 'visible';
        setLoading(false);
        notify.success(config.manageNews.notification().EDIT_NEWS_SUCCESS);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const handleEditNews = async (formData, e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            id: oldNews.id,
            title: formData.title,
            content: formData.content,
        };
        const messeageNotify = config.manageNews.errorMesseage.getMesseageNotify();
        handleMiddleEditNews(data).catch((error) => {
            setLoading(false);

            if (!error.response) {
                notify.error(messeageNotify.ERROR_NETWORD);
                return;
            }

            const { message } = error.response.data;
            const { messeageLogic } = config.manageNews.errorMesseage;
            if (error.response.status === 404 && message.includes(messeageLogic.NEWS_NOT_FOUND)) {
                notify.error(messeageNotify.NEWS_NOT_FOUND);
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
                onSave={handleEditNews}
                handleSubmitForm={handleSubmit}
                title={t('edit_news')}
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
                    {...register('content', valid.content)}
                    errolMesseage={errors.definition?.message}
                    textArea={true}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </PopperForm>
            {loading && <Loading />}
        </Fragment>
    );
}

EditNews.propTypes = {
    setIsPoperEditNews: PropTypes.func.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default EditNews;

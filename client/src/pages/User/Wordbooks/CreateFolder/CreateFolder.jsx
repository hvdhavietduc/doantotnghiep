import PropTypes from 'prop-types';
// import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';

// import styles from './CreateFolder.module.scss';
import PopperForm from '~/components/PopperForm';
import Loading from '~/components/Loading';
import Input from '~/components/Input';
import { createFolder } from '~/services/folderService';
import notify from '~/utils/notify';
import config from '~/config';
import getValid from '../validateForm';

// const cx = classNames.bind(styles);

function CreateFolders({ setIsPoperCreateFolder, onPageChange }) {
    const [loading, setLoading] = useState(false);

    const { t } = useTranslation('translation', { keyPrefix: 'WordBooks' });
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
        setIsPoperCreateFolder(false);
        document.body.style.overflow = 'visible';
    };

    const handleMiddleCreateFolder = async (data) => {
        await createFolder(data, cookies.token);
        await onPageChange(1);
        setIsPoperCreateFolder(false);
        document.body.style.overflow = 'visible';
        setLoading(false);
        notify.success(config.wordsbooks.notification().CREATE_FOLDER_SUCCESS);
    };

    const handleCreateFolder = async (formData, e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            name: formData.title,
            description: formData.description,
        };
        const messeageNotify = config.wordsbooks.errorMesseage.getMesseageNotify();
        handleMiddleCreateFolder(data).catch((error) => {
            setLoading(false);

            if (!error.response) {
                notify.error(messeageNotify.ERROR_NETWORD);
                return;
            }

            const { message } = error.response.data;
            const { messeageLogic } = config.wordsbooks.errorMesseage;
            if (error.response.status === 400 && message.includes(messeageLogic.FOLDER_ALREADY_EXIST)) {
                setError('title', { type: 'custom', message: messeageNotify.FOLDER_ALREADY_EXIST });
                notify.error(messeageNotify.FOLDER_ALREADY_EXIST);
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
                onSave={handleCreateFolder}
                handleSubmitForm={handleSubmit}
                title={t('create_folder')}
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
                    textArea
                    {...register('description', valid.description)}
                    errolMesseage={errors.description?.message}
                />
            </PopperForm>
            {loading && <Loading />}
        </Fragment>
    );
}

CreateFolders.propTypes = {
    setIsPoperCreateFolder: PropTypes.func.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default CreateFolders;

import PropTypes from 'prop-types';
// import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import styles from './CreateFolder.module.scss';
import PopperForm from '~/components/PopperForm';
import Loading from '~/components/Loading';
import Input from '~/components/Input';
import {} from '~/services/folderService';
import {} from '~/redux/wordBooksSlice';
import notify from '~/utils/notify';
import config from '~/config';
import getValid from '../validateForm';

// const cx = classNames.bind(styles);

function CreateFolders({ setIsPoperCreateFolder }) {
    const { t } = useTranslation('translation', { keyPrefix: 'WordBooks' });

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

    const handleCreateFolder = (formData, e) => {
        e.preventDefault();
        console.log(formData);
    };
    return (
        <PopperForm onClose={closePoper} onSave={handleCreateFolder} handleSubmitForm={handleSubmit}>
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
    );
}

CreateFolders.propTypes = {
    setIsPoperCreateFolder: PropTypes.func.isRequired,
};

export default CreateFolders;

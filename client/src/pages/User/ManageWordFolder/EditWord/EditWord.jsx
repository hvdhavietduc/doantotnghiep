import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { useState, Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';

import styles from './EditWord.module.scss';
import PopperForm from '~/components/PopperForm';
import Loading from '~/components/Loading';
import Input from '~/components/Input';
import { editFolder } from '~/services/folderService';
import notify from '~/utils/notify';
import config from '~/config';
import getValid from '../validateForm';

const cx = classNames.bind(styles);

function EditFolder({ setIsPoperEditWord, inforWord, onPageChange }) {
    const [loading, setLoading] = useState(false);

    const { currentPage } = useSelector((state) => state.wordBooks);
    const { t } = useTranslation('translation', { keyPrefix: 'ManageWordFolder' });
    //eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['token']);

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm();

    const valid = getValid();

    const closePoper = () => {
        setIsPoperEditWord(false);
        document.body.style.overflow = 'visible';
    };

    const handleEditWord = () => {};

    const handleMiddileEditFolder = async (data) => {
        await editFolder(data, cookies.token);
        await onPageChange(currentPage);
        setIsPoperEditWord(false);
        setLoading(false);
        document.body.style.overflow = 'visible';
        notify.success(config.wordsbooks.notification().EDIT_FOLDER_SUCCESS);
    };

    const handleEditFolder = (formData, e) => {
        e.preventDefault();
        setLoading(true);
        // const data = {
        //     name: formData.title,
        //     description: formData.description,
        //     id: inforFolder.idFolder,
        // };
        const messeageNotify = config.wordsbooks.errorMesseage.getMesseageNotify();
        // handleMiddileEditFolder(data).catch((error) => {
        //     setLoading(false);
        //     if (!error.response) {
        //         notify.error(messeageNotify.ERROR_NETWORD);
        //         return;
        //     }

        //     const { message } = error.response.data;
        //     const { messeageLogic } = config.wordsbooks.errorMesseage;
        //     if (error.response.status === 400 && message.includes(messeageLogic.FOLDER_ALREADY_EXIST)) {
        //         setError('title', { type: 'custom', message: messeageNotify.FOLDER_ALREADY_EXIST });
        //         notify.error(messeageNotify.FOLDER_ALREADY_EXIST);
        //         return;
        //     }
        //     notify.error(error.response.data.message);
        //     return;
        // });
    };

    // useEffect(() => {
    //     setValue('title', inforFolder.nameFolder);
    //     setValue('description', inforFolder.description);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return (
        <Fragment>
            <PopperForm
                onClose={closePoper}
                onSave={handleEditWord}
                handleSubmitForm={handleSubmit}
                title={t('add_new_word')}
            >
                <Input
                    name={'title'}
                    label={t('title')}
                    {...register('title', valid.title)}
                    errolMesseage={errors.title?.message}
                />
                <Input
                    name={'definition'}
                    label={t('definition')}
                    {...register('title', valid.definition)}
                    errolMesseage={errors.definition?.message}
                />
                <div className={cx('flex justify-between')}>
                    <Input
                        name={'wordType'}
                        label={t('word_type')}
                        className={cx('w-2/5 inline-block')}
                        {...register('title', valid.wordType)}
                        errolMesseage={errors.wordType?.message}
                    />
                    <Input
                        name={'spell'}
                        label={t('spell')}
                        className={cx('w-2/5 inline-block')}
                        {...register('title', valid.spell)}
                        errolMesseage={errors.spell?.message}
                    />
                </div>
                <Input
                    name={'example'}
                    label={t('example')}
                    {...register('title', valid.example)}
                    errolMesseage={errors.example?.message}
                />
                <Input
                    name={'note'}
                    label={t('note')}
                    {...register('title', valid.note)}
                    errolMesseage={errors.note?.message}
                />
            </PopperForm>
            {loading && <Loading />}
        </Fragment>
    );
}

EditFolder.propTypes = {
    setIsPoperEditWord: PropTypes.func.isRequired,
    // inforFolder: PropTypes.object.isRequired,
    // onPageChange: PropTypes.func.isRequired,
};

export default EditFolder;

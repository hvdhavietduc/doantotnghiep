import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { useState, Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import styles from './EditWord.module.scss';
import PopperForm from '~/components/PopperForm';
import Loading from '~/components/Loading';
import Input from '~/components/Input';
import { editWord } from '~/services/folderService';
import { search } from '~/services/lookupServices';
import notify from '~/utils/notify';
import config from '~/config';
import getValid from '../validateForm';

const cx = classNames.bind(styles);

function EditWord({ setIsPoperEditWord, inforWord, onPageChange }) {
    const [loading, setLoading] = useState(false);

    const { t } = useTranslation('translation', { keyPrefix: 'ManageWordFolder' });
    //eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['token']);

    const location = useLocation();

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm();

    const valid = getValid();

    const currentPath = location.pathname;
    const currentPage = Number(currentPath.split('/')[4]);
    const folderId = String(currentPath.split('/')[3]);

    const closePoper = () => {
        setIsPoperEditWord(false);
        document.body.style.overflow = 'visible';
    };

    const handleMiddileEditWord = async (formData) => {
        const result = await search(formData.title);

        const data = {
            id: inforWord.id,
            name: formData.title,
            pronunciationUKAudio: result.pronunciationUKAudio,
            pronunciationUK: formData.spell ? formData.spell : result.pronunciationUK,
            pronunciationUSAudio: result.pronunciationUSAudio,
            pronunciationUS: result.pronunciationUS,
            types: [
                {
                    type: formData.wordType,
                    means: [
                        {
                            level: '',
                            conceptEnglish: formData.definition + ':',
                            conceptVietnamese: '',
                            examples: formData.example.split('\n').map((value) => ({
                                example: value,
                                meanOfExample: '',
                            })),
                        },
                    ],
                },
            ],
            synonyms: [],
            antonyms: [],
            folderId: folderId,
        };
        await editWord(data, cookies.token);
        await onPageChange(currentPage, true);
        setIsPoperEditWord(false);
        setLoading(false);
        document.body.style.overflow = 'visible';
        notify.success(config.manageWordFolder.notification().EDIT_WORD_SUCCESS);
    };

    const handleEditWord = (formData, e) => {
        e.preventDefault();
        setLoading(true);

        const messeageNotify = config.wordsbooks.errorMesseage.getMesseageNotify();
        handleMiddileEditWord(formData).catch((error) => {
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

    useEffect(() => {
        setValue('title', inforWord.name);
        setValue('spell', inforWord.pronunciationUK);
        setValue('wordType', inforWord.types[0].type);
        setValue('definition', inforWord.types[0].means[0].conceptEnglish);
        setValue(
            'example',
            inforWord.types[0].means[0].examples.reduce(
                (accumulator, currentValue) => accumulator + currentValue.example + '\n',
                '',
            ),
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    {...register('definition', valid.definition)}
                    errolMesseage={errors.definition?.message}
                />
                <div className={cx('flex justify-between')}>
                    <Input
                        name={'wordType'}
                        label={t('word_type')}
                        className={cx('inline-block w-2/5')}
                        {...register('wordType', valid.wordType)}
                        errolMesseage={errors.wordType?.message}
                    />
                    <Input
                        name={'spell'}
                        label={t('spell')}
                        className={cx('inline-block w-2/5')}
                        {...register('spell', valid.spell)}
                        errolMesseage={errors.spell?.message}
                    />
                </div>
                <Input
                    name={'example'}
                    label={t('example')}
                    textArea
                    {...register('example', valid.example)}
                    errolMesseage={errors.example?.message}
                />
                {/* <Input
                    name={'note'}
                    label={t('note')}
                    {...register('title', valid.note)}
                    errolMesseage={errors.note?.message}
                /> */}
            </PopperForm>
            {loading && <Loading />}
        </Fragment>
    );
}

EditWord.propTypes = {
    setIsPoperEditWord: PropTypes.func.isRequired,
    inforWord: PropTypes.object.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default EditWord;

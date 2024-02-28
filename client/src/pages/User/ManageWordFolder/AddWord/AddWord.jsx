import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import styles from './AddWord.module.scss';
import PopperForm from '~/components/PopperForm';
import Loading from '~/components/Loading';
import Input from '~/components/Input';
import { addNewWord } from '~/services/folderService';
import { search } from '~/services/lookupServices';
import notify from '~/utils/notify';
import config from '~/config';
import getValid from '../validateForm';

const cx = classNames.bind(styles);

function AddWord({ setIsPoperAddWord, onPageChange }) {
    const [loading, setLoading] = useState(false);

    const { t } = useTranslation('translation', { keyPrefix: 'ManageWordFolder' });
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['token']);

    const location = useLocation();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();

    const valid = getValid();

    const currentPath = location.pathname;
    const folderId = String(currentPath.split('/')[3]);

    const closePoper = () => {
        setIsPoperAddWord(false);
        document.body.style.overflow = 'visible';
    };

    const handleMiddleCreateWord = async (formData) => {
        console.log(formData);
        const result = await search(formData.title);
        console.log(result);
        const data = {
            name: formData.title,
            pronunciationUKAudio: result.pronunciationUKAudio,
            pronunciationUK: formData.spell ? formData.spell : result.pronunciationUK,
            pronunciationUSAudio: result.pronunciationUSAudio,
            pronunciationUS: result.pronunciationUS,
            types: [
                {
                    type: '',
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
        console.log(data);
        await addNewWord(data, cookies.token);
        await onPageChange(1, true);

        setIsPoperAddWord(false);
        document.body.style.overflow = 'visible';
        setLoading(false);
        notify.success(config.manageWordFolder.notification().ADD_NEW_WORD_SUCCESS);
    };

    const handleCreateWord = async (formData, e) => {
        e.preventDefault();
        setLoading(true);

        const messeageNotify = config.manageWordFolder.errorMesseage.getMesseageNotify();
        handleMiddleCreateWord(formData).catch((error) => {
            setLoading(false);

            if (!error.response) {
                notify.error(messeageNotify.ERROR_NETWORD);
                return;
            }

            const { message } = error.response.data;
            const { messeageLogic } = config.manageWordFolder.errorMesseage;
            if (error.response.status === 400 && message.includes(messeageLogic.WORD_ALREADY_EXIST)) {
                setError('title', { type: 'custom', message: messeageNotify.WORD_ALREADY_EXIST });
                notify.error(messeageNotify.WORD_ALREADY_EXIST);
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
                onSave={handleCreateWord}
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

AddWord.propTypes = {
    setIsPoperAddWord: PropTypes.func.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default AddWord;

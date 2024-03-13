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
import { createCategory } from '~/services/manageWordCategoryServices';
import handleError from '~/config/handleError';

function AddWordCategory({ setIsPoperAddWordCategory, onPageChange, forceUpdate }) {
    const [loading, setLoading] = useState(false);

    const { t } = useTranslation('translation', { keyPrefix: 'ManageWordCategory' });
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['token']);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const valid = getValid();

    const closePoper = () => {
        setIsPoperAddWordCategory(false);
        document.body.style.overflow = 'visible';
    };

    const handleMiddleCreateWordCategory = async (data) => {
        await createCategory(data, cookies.token);
        await onPageChange(1, true);
        setIsPoperAddWordCategory(false);
        document.body.style.overflow = 'visible';
        setLoading(false);
        notify.success(config.ManageWordCategory.notification().ADD_CATEGORY_SUCCESS);
        // setTimeout(() => {
        //     window.location.reload();
        // }, 1000);
        forceUpdate();
    };

    const handleCreateWordCategory = async (formData, e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            name: formData.name,
        };
        const messeageNotify = config.ManageWordCategory.errorMesseage.getMesseageNotify();
        handleMiddleCreateWordCategory(data).catch((error) => {
            setLoading(false);

            if (!error.response) {
                notify.error(messeageNotify.ERROR_NETWORD);
                return;
            }

            const { message } = error.response.data;
            const configLogic = config.ManageWordCategory;
            handleError(configLogic, message);
        });
    };
    return (
        <Fragment>
            <PopperForm
                onClose={closePoper}
                onSave={handleCreateWordCategory}
                handleSubmitForm={handleSubmit}
                title={t('add_category')}
            >
                <Input
                    name={'name'}
                    label={t('name')}
                    {...register('name', valid.name)}
                    errolMesseage={errors.name?.message}
                />
            </PopperForm>
            {loading && <Loading />}
        </Fragment>
    );
}

AddWordCategory.propTypes = {
    setIsPoperAddWordCategory: PropTypes.func.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default AddWordCategory;

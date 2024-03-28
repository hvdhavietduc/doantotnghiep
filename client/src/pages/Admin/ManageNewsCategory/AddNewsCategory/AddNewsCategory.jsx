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
import { createNewsCategory } from '~/services/manageNewsCategoryServices';
import handleError from '~/config/handleError';

function AddNewsCategory({ setIsPoperAddNewsCategoryCategory, onPageChange, forceUpdate }) {
    const [loading, setLoading] = useState(false);

    const { t } = useTranslation('translation', { keyPrefix: 'ManageNewsCategory' });
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['token']);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const valid = getValid();

    const closePoper = () => {
        setIsPoperAddNewsCategoryCategory(false);
        document.body.style.overflow = 'visible';
    };

    const handleMiddleCreateNewsCategoryCategory = async (data) => {
        await createNewsCategory(data, cookies.token);
        await onPageChange(1, true);
        setIsPoperAddNewsCategoryCategory(false);
        document.body.style.overflow = 'visible';
        setLoading(false);
        notify.success(config.ManageNewsCategory.notification().ADD_CATEGORY_SUCCESS);
        forceUpdate();
    };

    const handleCreateNewsCategoryCategory = async (formData, e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            name: formData.name,
        };
        const messeageNotify = config.ManageNewsCategory.errorMesseage.getMesseageNotify();
        handleMiddleCreateNewsCategoryCategory(data).catch((error) => {
            setLoading(false);

            if (!error.response) {
                notify.error(messeageNotify.ERROR_NETWORD);
                return;
            }

            const { message } = error.response.data;
            const configLogic = config.ManageNewsCategory;
            handleError(configLogic, message);
        });
    };
    return (
        <Fragment>
            <PopperForm
                onClose={closePoper}
                onSave={handleCreateNewsCategoryCategory}
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

AddNewsCategory.propTypes = {
    setIsPoperAddNewsCategoryCategory: PropTypes.func.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default AddNewsCategory;

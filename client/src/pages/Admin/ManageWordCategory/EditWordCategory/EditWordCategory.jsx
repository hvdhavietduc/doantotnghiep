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
import { editCategory } from '~/services/manageWordCategoryServices';
import handleError from '~/config/handleError';

function EditWordCategory({ setIsPoperEditWordCategory, onPageChange, oldCategory, forceUpdate }) {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(oldCategory.name);
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
        setIsPoperEditWordCategory(false);
        document.body.style.overflow = 'visible';
    };

    const handleMiddleEditCategory = async (data) => {
        await editCategory(data, cookies.token);
        await onPageChange(1, true);
        setIsPoperEditWordCategory(false);
        document.body.style.overflow = 'visible';
        setLoading(false);
        notify.success(config.ManageWordCategory.notification().EDIT_CATEGORY_SUCCESS);
        forceUpdate();
    };

    const handleEditCategory = async (formData, e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            id: oldCategory.id,
            name: formData.name,
        };
        const messeageNotify = config.ManageWordCategory.errorMesseage.getMesseageNotify();
        handleMiddleEditCategory(data).catch((error) => {
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
                onSave={handleEditCategory}
                handleSubmitForm={handleSubmit}
                title={t('edit_category')}
            >
                <Input
                    name={'name'}
                    label={t('name')}
                    {...register('name', valid.name)}
                    errolMesseage={errors.name?.message}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </PopperForm>
            {loading && <Loading />}
        </Fragment>
    );
}

EditWordCategory.propTypes = {
    setIsPoperEditWordCategory: PropTypes.func.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default EditWordCategory;

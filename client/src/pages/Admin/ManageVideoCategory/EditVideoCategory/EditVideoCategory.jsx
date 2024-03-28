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
import { editVideoCategory } from '~/services/manageVideoCategoryServices';
import handleError from '~/config/handleError';

function EditVideoCategory({ setIsPoperEditVideoCategory, onPageChange, oldCategory, forceUpdate }) {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(oldCategory.name);
    const { t } = useTranslation('translation', { keyPrefix: 'ManageVideoCategory' });
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['token']);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const valid = getValid();

    const closePoper = () => {
        setIsPoperEditVideoCategory(false);
        document.body.style.overflow = 'visible';
    };

    const handleMiddleEditCategory = async (data) => {
        await editVideoCategory(data, cookies.token);
        await onPageChange(1, true);
        setIsPoperEditVideoCategory(false);
        document.body.style.overflow = 'visible';
        setLoading(false);
        notify.success(config.ManageVideoCategory.notification().EDIT_CATEGORY_SUCCESS);
        forceUpdate();
    };

    const handleEditCategory = async (formData, e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            id: oldCategory.id,
            name: formData.name,
        };
        const messeageNotify = config.ManageVideoCategory.errorMesseage.getMesseageNotify();
        handleMiddleEditCategory(data).catch((error) => {
            setLoading(false);

            if (!error.response) {
                notify.error(messeageNotify.ERROR_NETWORD);
                return;
            }

            const { message } = error.response.data;
            const configLogic = config.ManageVideoCategory;
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

EditVideoCategory.propTypes = {
    setIsPoperEditVideoCategory: PropTypes.func.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default EditVideoCategory;

import { useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';

import Loading from '~/components/Loading';
import PopperConfirm from '~/components/PopperConfirm';
import { deleteNewsCategory } from '~/services/manageNewsCategoryServices';
import notify from '~/utils/notify';
import config from '~/config';
import handleError from '~/config/handleError';


function DeleteNewsCategory({ setIsPoperDeleteNewsCategory, categoryId, forceUpdate }) {
    const [loading, setLoading] = useState(false);

    const { t } = useTranslation('translation', { keyPrefix: 'ManageNewsCategory' });
    //eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['token']);

    const closePoper = () => {
        setIsPoperDeleteNewsCategory(false);
        document.body.style.overflow = 'visible';
    };

    const handleMiddleDeletetCategory = async () => {
        await deleteNewsCategory(cookies.token, categoryId).then((result) => {
            setIsPoperDeleteNewsCategory(false);
            document.body.style.overflow = 'visible';
            setLoading(false);
            notify.success(config.ManageNewsCategory.notification().DELETE_CATEGORY_SUCCESS);
            forceUpdate();
        });
    };

    const handleDeleteCategory = async () => {
        setLoading(true);
        handleMiddleDeletetCategory().catch((error) => {
            setLoading(false);
            const messeageNotify = config.errorMesseage.getMesseageNotify();
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
            <PopperConfirm onClose={closePoper} onSave={handleDeleteCategory}>
                {t('are_you_sure_to_delete_category')}
            </PopperConfirm>

            {loading && <Loading />}
        </Fragment>
    );
}

export default DeleteNewsCategory;

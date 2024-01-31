import PropTypes from 'prop-types';
// import classNames from 'classnames/bind';
import { useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';

// import styles from './Delete.module.scss';
import Loading from '~/components/Loading';
import PopperConfirm from '~/components/PopperConfirm';
import { deleteFolder } from '~/services/folderService';
import notify from '~/utils/notify';
import config from '~/config';

// const cx = classNames.bind(styles);

function DeleteFolder({ setIsPoperDeleteFolder, inforFolder, onPageChange }) {
    const [loading, setLoading] = useState(false);

    const { t } = useTranslation('translation', { keyPrefix: 'WordBooks' });
    //eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['token']);
    const { currentPage } = useSelector((state) => state.wordBooks);

    const closePoper = () => {
        setIsPoperDeleteFolder(false);
        document.body.style.overflow = 'visible';
    };

    const handleMiddleDeletetFolder = async () => {
        const data = {
            id: inforFolder.idFolder,
        };
        await deleteFolder(data, cookies.token);
        onPageChange(currentPage, true);
        setIsPoperDeleteFolder(false);
        document.body.style.overflow = 'visible';
        setLoading(false);
        notify.success(config.wordsbooks.notification().DELETE_FOLDER_SUCCESS);
    };

    const handleDeletetFolder = async () => {
        setLoading(true);
        handleMiddleDeletetFolder().catch((error) => {
            setLoading(false);
            const messeageNotify = config.errorMesseage.getMesseageNotify();
            if (!error.response) {
                notify.error(messeageNotify.ERROR_NETWORD);
                return;
            }
        });
    };

    return (
        <Fragment>
            <PopperConfirm
                onClose={closePoper}
                onSave={handleDeletetFolder}
                content={t('Are_you_sure_to_delete_folder') + '[' + inforFolder.nameFolder + '] ?'}
            />

            {loading && <Loading />}
        </Fragment>
    );
}

DeleteFolder.propTypes = {
    setIsPoperDeleteFolder: PropTypes.func.isRequired,
    inforFolder: PropTypes.object.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default DeleteFolder;

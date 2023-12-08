import PropTypes from 'prop-types';
// import classNames from 'classnames/bind';
import { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';

// import styles from './Delete.module.scss';
import Loading from '~/components/Loading';
import PopperConfirm from '~/components/PopperConfirm';
import { deleteFolder, getFolderAll } from '~/services/folderService';
import { updateListFolder } from '~/redux/wordBooksSlice';
import notify from '~/utils/notify';
import config from '~/config';

// const cx = classNames.bind(styles);

function DeleteFolder({ setIsPoperDeleteFolder, inforFolder }) {
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const { t } = useTranslation('translation', { keyPrefix: 'WordBooks' });
    //eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['token']);

    const closePoper = () => {
        setIsPoperDeleteFolder(false);
        document.body.style.overflow = 'visible';
    };

    const handleMiddleDeletetFolder = async () => {
        const data = {
            id: inforFolder.idFolder,
        };
        await deleteFolder(data, cookies.token);
        const token = cookies.token;
        const response = await getFolderAll(token);
        return response;
    };

    const handleDeletetFolder = () => {
        setLoading(true);
        handleMiddleDeletetFolder()
            .then((result) => {
                dispatch(updateListFolder(result.folders));
                setIsPoperDeleteFolder(false);
                document.body.style.overflow = 'visible';
                setLoading(false);
                notify.success(config.wordsbooks.notification().DELETE_FOLDER_SUCCESS);
            })
            .catch((error) => {
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
};

export default DeleteFolder;

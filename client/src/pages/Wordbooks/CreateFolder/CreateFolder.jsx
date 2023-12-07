import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState, useEffect, Fragment } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// import Input from '~/components/Input';
import styles from './CreateFolder.module.scss';
import PopperForm from '~/components/PopperForm';
import Loading from '~/components/Loading';
import { getFolderAll } from '~/services/folderService';
import { initialListFolder } from '~/redux/wordBooksSlice';
import notify from '~/utils/notify';
import config from '~/config';
import Input from '~/components/Input';

const cx = classNames.bind(styles);

function CreateFolders({ setIsPoperCreateFolder }) {
    const { t } = useTranslation('translation', { keyPrefix: 'WordBooks' });
    const closePoper = () => {
        setIsPoperCreateFolder(false);
        document.body.style.overflow = 'visible';
    };

    const handleCreateFolder = () => {};
    return (
        <PopperForm onClose={closePoper} onSave={handleCreateFolder}>
            <Input name={'title'} label={t('title')} />
            <Input name={'Decreption'} label={t('decreption')} textArea />
        </PopperForm>
    );
}

PopperForm.propTypes = {
    setIsPoperCreateFolder: PropTypes.func.isRequired,
};

export default CreateFolders;

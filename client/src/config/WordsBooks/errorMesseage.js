import i18next from '~/utils/i18n';

const getMesseageNotify = () => ({
    ERROR_NETWORD: i18next.t('Error.error_network'),
    FOLDER_ALREADY_EXIST: i18next.t('WordBooks.folder_already_exist'),
});

const messeageLogic = { FOLDER_ALREADY_EXIST: 'Folder already exist' };

const errorMesseage = { getMesseageNotify, messeageLogic };

export default errorMesseage;

import i18next from '~/utils/i18n';

const getMesseageNotify = () => ({
    ERROR_NETWORD: i18next.t('Error.error_network'),
    WORD_ALREADY_EXIST: i18next.t('ManageWordFolder.word_already_exist'),
});

const messeageLogic = { WORD_ALREADY_EXIST: 'Word already exist' };

const errorMesseage = { getMesseageNotify, messeageLogic };

export default errorMesseage;

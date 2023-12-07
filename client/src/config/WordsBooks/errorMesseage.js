import i18next from '~/utils/i18n';

const getMesseageNotify = () => ({ ERROR_NETWORD: i18next.t('Error.error_network') });

const messeageLogic = {};

const errorMesseage = { getMesseageNotify, messeageLogic };

export default errorMesseage;

import i18next from '~/utils/i18n';

const getMesseageNotify = () => ({
    ERROR_NETWORD: i18next.t('Error.error_network'),
    NEWS_NOT_FOUND: i18next.t('ManageNews.news_not_found'),
});

const messeageLogic = { NEWS_NOT_FOUND: 'News not found' };


const errorMesseage = { getMesseageNotify, messeageLogic };

export default errorMesseage;

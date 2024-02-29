import i18next from '~/utils/i18n';

const notification = () => ({
    DELETE_NEWS_SUCCESS : i18next.t('ManageNews.delete_news_success'),
    ADD_NEWS_SUCCESS : i18next.t('ManageNews.add_news_success'),
    EDIT_NEWS_SUCCESS : i18next.t('ManageNews.edit_news_success'),
});

export default notification;
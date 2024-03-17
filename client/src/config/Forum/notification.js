import i18next from '~/utils/i18n';

const notification = () => ({
    ADD_POST_SUCCESS : i18next.t('Forum.add_post_success'),
    EDIT_POST_SUCCESS : i18next.t('Forum.edit_post_success'),
    DELETE_POST_SUCCESS : i18next.t('Forum.delete_post_success'),
});

export default notification;

import i18next from '~/utils/i18n';

const notification = () => ({
    ADD_NEW_WORD_SUCCESS: i18next.t('ManageWordFolder.add_new_word_success'),
    EDIT_WORD_SUCCESS: i18next.t('ManageWordFolder.edit_word_success'),
    DELETE_WORD_SUCCESS: i18next.t('ManageWordFolder.delete_word_success'),
});

export default notification;

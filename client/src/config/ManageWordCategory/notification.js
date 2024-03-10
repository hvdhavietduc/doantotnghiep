import i18next from '~/utils/i18n';

const notification = () => ({
    ADD_CATEGORY_SUCCESS: i18next.t('ManageWordCategory.add_category_success'),
    EDIT_CATEGORY_SUCCESS: i18next.t('ManageWordCategory.edit_category_success'),
    DELETE_CATEGORY_SUCCESS: i18next.t('ManageWordCategory.delete_category_success'),
});

export default notification;
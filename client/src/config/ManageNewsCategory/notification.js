import i18next from '~/utils/i18n';

const notification = () => ({
    ADD_CATEGORY_SUCCESS: i18next.t('ManageNewsCategory.add_category_success'),
    EDIT_CATEGORY_SUCCESS: i18next.t('ManageNewsCategory.edit_category_success'),
    DELETE_CATEGORY_SUCCESS: i18next.t('ManageNewsCategory.delete_category_success'),
});

export default notification;
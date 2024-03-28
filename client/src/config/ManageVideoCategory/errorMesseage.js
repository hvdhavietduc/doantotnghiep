import i18next from '~/utils/i18n';

const getMesseageNotify = () => ({
    ERROR_NETWORD: i18next.t('Error.error_network'),
    CATEGORY_NOT_FOUND: i18next.t('ManageVideoCategory.category_not_found'),
    CATEGORY_ALREADY_EXIST: i18next.t('ManageVideoCategory.category_already_exist'),
});

const messeageLogic = { CATEGORY_NOT_FOUND: 'Category not found',
    CATEGORY_ALREADY_EXIST: 'Category already exists',
};

const errorMesseage = { getMesseageNotify, messeageLogic };

export default errorMesseage;

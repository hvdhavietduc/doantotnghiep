import i18next from '~/utils/i18n';

const getMesseageNotify = () => ({
    ERROR_NETWORD: i18next.t('Error.error_network'),
    CATEGORY_OF_WORD_NOT_FOUND: i18next.t('ManageWordCategory.category_of_word_not_found'),
    WORD_NOT_EXIST_IN_CATEGORY: i18next.t('ManageWordCategory.word_not_exist'),
    WORD_ALREADY_EXIST_IN_CATEGORY: i18next.t('ManageWordCategory.word_already_exist'),
});

const messeageLogic = {
    CATEGORY_OF_WORD_NOT_FOUND: 'Category of word not found',
    WORD_NOT_EXIST_IN_CATEGORY: 'Word not exist in category',
    WORD_ALREADY_EXIST_IN_CATEGORY: 'Word already exist in category',
};

const errorMesseage = { getMesseageNotify, messeageLogic };

export default errorMesseage;

import i18next from '~/utils/i18n';
import config from '~/config';

const { constantsValid } = config.wordsbooks;

const getValid = () => ({
    title: {
        required: i18next.t('WordBooks.title') + i18next.t('Valid.is_required'),
        minLength: {
            value: constantsValid.length.MIN_LENGTH_TITLE,
            message:
                i18next.t('WordBooks.title') +
                i18next.t('Valid.must_least') +
                constantsValid.length.MIN_LENGTH_TITLE +
                i18next.t('Valid.characters'),
        },
        maxLength: {
            value: constantsValid.length.MAX_LENGTH_TITLE,
            message:
                i18next.t('WordBooks.title') +
                i18next.t('Valid.must_most') +
                constantsValid.length.MAX_LENGTH_TITLE +
                i18next.t('Valid.characters'),
        },
        pattern: {
            value: constantsValid.pattern.TITLE,
            message: i18next.t('WordBooks.title') + i18next.t('WordBooks.contain_only_letters_number_and_spaces'),
        },
    },
    description: {
        minLength: {
            value: constantsValid.length.MIN_LENGTH_DESCRIPTION,
            message:
                i18next.t('WordBooks.description') +
                i18next.t('Valid.must_least') +
                constantsValid.length.MIN_LENGTH_DESCRIPTION +
                i18next.t('Valid.characters'),
        },
        maxLength: {
            value: constantsValid.length.MAX_LENGTH_DESCRIPTION,
            message:
                i18next.t('WordBooks.description') +
                i18next.t('Valid.must_most') +
                constantsValid.length.MAX_LENGTH_DESCRIPTION +
                i18next.t('Valid.characters'),
        },
    },
});

export default getValid;

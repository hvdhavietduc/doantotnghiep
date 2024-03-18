import i18next from '~/utils/i18n';
import config from '~/config';

const { constantsValid } = config.forum;

const getValid = () => ({
    title: {
        required: i18next.t('Forum.title') + i18next.t('Valid.is_required'),
        minLength: {
            value: constantsValid.length.MIN_LENGTH_TITLE,
            message:
                i18next.t('Forum.title') +
                i18next.t('Valid.must_least') +
                constantsValid.length.MIN_LENGTH_TITLE +
                i18next.t('Valid.characters'),
        },
        maxLength: {
            value: constantsValid.length.MAX_LENGTH_TITLE,
            message:
                i18next.t('Forum.title') +
                i18next.t('Valid.must_most') +
                constantsValid.length.MAX_LENGTH_TITLE +
                i18next.t('Valid.characters'),
        },
    },
    content: {
        minLength: {
            value: constantsValid.length.MIN_LENGTH_CONTENT,
            message:
                i18next.t('Forum.content') +
                i18next.t('Valid.must_least') +
                constantsValid.length.MIN_LENGTH_CONTENT +
                i18next.t('Valid.characters'),
        },
        maxLength: {
            value: constantsValid.length.MAX_LENGTH_CONTENT,
            message:
                i18next.t('Forum.content') +
                i18next.t('Valid.must_most') +
                constantsValid.length.MAX_LENGTH_CONTENT +
                i18next.t('Valid.characters'),
        },
    },
});

export default getValid;

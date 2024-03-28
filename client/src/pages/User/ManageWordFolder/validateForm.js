import i18next from '~/utils/i18n';
import config from '~/config';

const { constantsValid } = config.manageWordFolder;

const getValid = () => ({
    title: {
        required: i18next.t('ManageWordFolder.title') + i18next.t('Valid.is_required'),
        minLength: {
            value: constantsValid.length.MIN_LENGTH_TITLE,
            message:
                i18next.t('ManageWordFolder.title') +
                i18next.t('Valid.must_least') +
                constantsValid.length.MIN_LENGTH_TITLE +
                i18next.t('Valid.characters'),
        },
        maxLength: {
            value: constantsValid.length.MAX_LENGTH_TITLE,
            message:
                i18next.t('ManageWordFolder.title') +
                i18next.t('Valid.must_most') +
                constantsValid.length.MAX_LENGTH_TITLE +
                i18next.t('Valid.characters'),
        },
        pattern: {
            value: constantsValid.pattern.TITLE,
            message: i18next.t('ManageWordFolder.title') + i18next.t('Valid.contain_only_letters_number_and_spaces'),
        },
    },
    definition: {
        minLength: {
            value: constantsValid.length.MIN_LENGTH_DEFINITION,
            message:
                i18next.t('ManageWordFolder.definition') +
                i18next.t('Valid.must_least') +
                constantsValid.length.MIN_LENGTH_DEFINITION +
                i18next.t('Valid.characters'),
        },
        maxLength: {
            value: constantsValid.length.MAX_LENGTH_DEFINITION,
            message:
                i18next.t('ManageWordFolder.definition') +
                i18next.t('Valid.must_most') +
                constantsValid.length.MAX_LENGTH_DEFINITION +
                i18next.t('Valid.characters'),
        },
    },
    note: {
        minLength: {
            value: constantsValid.length.MIN_LENGTH_NOTE,
            message:
                i18next.t('ManageWordFolder.definition') +
                i18next.t('Valid.must_least') +
                constantsValid.length.MIN_LENGTH_NOTE +
                i18next.t('Valid.characters'),
        },
        maxLength: {
            value: constantsValid.length.MAX_LENGTH_NOTE,
            message:
                i18next.t('ManageWordFolder.definition') +
                i18next.t('Valid.must_most') +
                constantsValid.length.MAX_LENGTH_NOTE +
                i18next.t('Valid.characters'),
        },
    },
    wordType: {
        minLength: {
            value: constantsValid.length.MIN_LENGTH_WORDTYPE,
            message:
                i18next.t('ManageWordFolder.word_type') +
                i18next.t('Valid.must_least') +
                constantsValid.length.MIN_LENGTH_WORDTYPE +
                i18next.t('Valid.characters'),
        },
        maxLength: {
            value: constantsValid.length.MAX_LENGTH_WORDTYPE,
            message:
                i18next.t('ManageWordFolder.word_type') +
                i18next.t('Valid.must_most') +
                constantsValid.length.MAX_LENGTH_WORDTYPE +
                i18next.t('Valid.characters'),
        },
    },
    spell: {
        minLength: {
            value: constantsValid.length.MIN_LENGTH_SPELL,
            message:
                i18next.t('ManageWordFolder.spell') +
                i18next.t('Valid.must_least') +
                constantsValid.length.MIN_LENGTH_SPELL +
                i18next.t('Valid.characters'),
        },
        maxLength: {
            value: constantsValid.length.MAX_LENGTH_SPELL,
            message:
                i18next.t('ManageWordFolder.spell') +
                i18next.t('Valid.must_most') +
                constantsValid.length.MAX_LENGTH_SPELL +
                i18next.t('Valid.characters'),
        },
    },
    example: {
        minLength: {
            value: constantsValid.length.MIN_LENGTH_EXAMPLES,
            message:
                i18next.t('ManageWordFolder.example') +
                i18next.t('Valid.must_least') +
                constantsValid.length.MIN_LENGTH_EXAMPLES +
                i18next.t('Valid.characters'),
        },
    },
});

export default getValid;

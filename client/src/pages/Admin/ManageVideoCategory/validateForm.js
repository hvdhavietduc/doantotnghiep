import i18next from '~/utils/i18n';
import config from '~/config';

const { constantsValid } = config.ManageVideoCategory;

const getValid = () => ({
    name: {
        required: i18next.t('ManageVideoCategory.name') + i18next.t('Valid.is_required'),
        minLength: {
            value: constantsValid.length.MIN_LENGTH_NAME,
            message:
                i18next.t('ManageVideoCategory.name') +
                i18next.t('Valid.must_least') +
                constantsValid.length.MIN_LENGTH_NAME +
                i18next.t('Valid.characters'),
        },
        maxLength: {
            value: constantsValid.length.MAX_LENGTH_NAME,
            message:
                i18next.t('ManageVideoCategory.name') +
                i18next.t('Valid.must_most') +
                constantsValid.length.MAX_LENGTH_NAME +
                i18next.t('Valid.characters'),
        },
        pattern: {
            value: constantsValid.pattern.TITLE,
            message: i18next.t('ManageVideoCategory.name') + i18next.t('valid.contain_only_letters_number_and_spaces'),
        },
    },
    
});

export default getValid;

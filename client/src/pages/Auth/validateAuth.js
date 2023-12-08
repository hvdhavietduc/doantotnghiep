import i18next from '~/utils/i18n';
import config from '~/config';

const { constantsValid } = config;

const valid = {
    fullName: {
        required: i18next.t('Auth.full_name') + i18next.t('Auth.is_required'),
        minLength: {
            value: constantsValid.length.MIN_LENGTH_NAME,
            message:
                i18next.t('Auth.full_name') +
                i18next.t('Auth.must_least') +
                constantsValid.length.MIN_LENGTH_NAME +
                i18next.t('Auth.characters'),
        },
        maxLength: {
            value: constantsValid.length.MAX_LENGTH_NAME,
            message:
                i18next.t('Auth.full_name') +
                i18next.t('Auth.must_most') +
                constantsValid.length.MAX_LENGTH_NAME +
                i18next.t('Auth.characters'),
        },
        pattern: {
            value: constantsValid.pattern.FULLNAME,
            message: i18next.t('Auth.full_name') + i18next.t('Auth.contain_only_letters_and_spaces'),
        },
    },
    userName: {
        required: i18next.t('Auth.username') + i18next.t('Auth.is_required'),
        minLength: {
            value: constantsValid.length.MIN_LENGTH_NAME,
            message:
                i18next.t('Auth.username') +
                i18next.t('Auth.must_least') +
                constantsValid.length.MIN_LENGTH_NAME +
                i18next.t('Auth.characters'),
        },
        maxLength: {
            value: constantsValid.length.MAX_LENGTH_NAME,
            message:
                i18next.t('Auth.username') +
                i18next.t('Auth.must_most') +
                constantsValid.length.MAX_LENGTH_NAME +
                i18next.t('Auth.characters'),
        },
        pattern: {
            value: constantsValid.pattern.USERNAME,
            message: i18next.t('Auth.username') + i18next.t('Auth.include_letters_numbers_and_underscores'),
        },
    },
    email: {
        required: 'Email' + i18next.t('Auth.is_required'),
        pattern: {
            value: constantsValid.pattern.EMAIL,
            message: i18next.t('Auth.invalid_email_address'),
        },
    },
    password: {
        required: i18next.t('Auth.password') + i18next.t('Auth.is_required'),
        minLength: {
            value: constantsValid.length.MIN_LENGTH_PASSWORD,
            message:
                i18next.t('Auth.password') +
                i18next.t('Auth.must_least') +
                constantsValid.length.MIN_LENGTH_PASSWORD +
                i18next.t('Auth.characters'),
        },
        maxLength: {
            value: constantsValid.length.MAX_LENGTH_PASSWORD,
            message:
                i18next.t('Auth.password') +
                i18next.t('Auth.must_most') +
                constantsValid.length.MAX_LENGTH_PASSWORD +
                i18next.t('Auth.characters'),
        },
        pattern: {
            value: constantsValid.pattern.PASSWORD,
            message:
                i18next.t('Auth.password') + i18next.t('Auth.include_at_least_one_letter_number_and_special_character'),
        },
    },
    passwordConfirm: {
        minLength: {
            value: constantsValid.length.MIN_LENGTH_PASSWORD,
            message:
                i18next.t('Auth.password_confirm') +
                i18next.t('Auth.must_least') +
                constantsValid.length.MIN_LENGTH_PASSWORD +
                i18next.t('Auth.characters'),
        },
        maxLength: {
            value: constantsValid.length.MAX_LENGTH_PASSWORD,
            message:
                i18next.t('Auth.password_confirm') +
                i18next.t('Auth.must_most') +
                constantsValid.length.MAX_LENGTH_PASSWORD +
                i18next.t('Auth.characters'),
        },
        required: i18next.t('Auth.password_confirm') + i18next.t('Auth.is_required'),
    },
    code: {
        minLength: {
            value: constantsValid.length.MIN_LENGTH_CODE,
            message:
                i18next.t('Auth.code') +
                i18next.t('Auth.must_least') +
                constantsValid.length.MIN_LENGTH_PASSWORD +
                i18next.t('Auth.characters'),
        },
        maxLength: {
            value: constantsValid.length.MAX_LENGTH_CODE,
            message:
                i18next.t('Auth.code') +
                i18next.t('Auth.must_most') +
                constantsValid.length.MAX_LENGTH_PASSWORD +
                i18next.t('Auth.characters'),
        },
        required: i18next.t('Auth.code') + i18next.t('Auth.is_required'),
    },
};

export default valid;

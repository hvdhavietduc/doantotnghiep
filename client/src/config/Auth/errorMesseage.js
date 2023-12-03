import i18next from '~/utils/i18n';

const getMesseageNotify = () => ({
    PASSWORD_NOT_MATCH: i18next.t('Auth.password_not_match'),
    USERNAME_EXIST: i18next.t('Auth.username_exist'),
    EMAIL_EXIST: i18next.t('Auth.email_exist'),
    WRONG_NAME_OR_PASSWORD: i18next.t('Auth.wrong_name_or_password'),
    USER_NOT_VERIFY: i18next.t('Auth.user_not_verify'),
    USER_NOT_FOUND: i18next.t('Auth.user_not_found'),
    USER_ALREADY_VERIFIED: i18next.t('Auth.user_already_verified'),
    WRONG_VERIFY_CODE: i18next.t('Auth.wrong_verify_code'),
    ERROR_NETWORD: i18next.t('Auth.error_network'),
});

const messeageLogic = {
    USERNAME_EXIST: 'Username already exist',
    EMAIL_EXIST: 'Email already exist',
    WRONG_NAME_OR_PASSWORD: 'Wrong username or password',
    USER_NOT_VERIFY: 'User not verified',
    USER_NOT_FOUND: 'User not found',
    USER_ALREADY_VERIFIED: 'User already verified',
    WRONG_VERIFY_CODE: 'Wrong verify code',
};

const errorMesseage = { getMesseageNotify, messeageLogic };

export default errorMesseage;

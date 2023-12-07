import i18next from '~/utils/i18n';

const notification = () => ({
    SIGNUP_SUCCESS: i18next.t('Auth.signup_success'),
    LOGIN_SUCCESS: i18next.t('Auth.login_success'),
    VERIFY_SUCCESS: i18next.t('Auth.verify_success'),
    CREATE_NEW_PASSWORD_SUCCESS: i18next.t('Auth.create_new_password_success'),
    USER_LOGED_IN: i18next.t('Auth.user_loged_in'),
});

export default notification;

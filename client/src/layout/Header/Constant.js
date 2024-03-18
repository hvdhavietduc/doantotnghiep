import config from '~/config';
import i18next from '~/utils/i18n';
import { faCircleQuestion, faEarthAsia, faUser, faSignOut, faUserGear } from '@fortawesome/free-solid-svg-icons';

export const getNavigation = () => [
    { title: i18next.t('Header.translation'), link: config.routes.translation.TRANSLATION },
    { title: i18next.t('Header.wordbooks'), link: config.routes.wordbooks.WORDBOOK + '/1' },
    { title: i18next.t('Header.video'), link: config.routes.video.VIDEO + '/1' },
    { title: i18next.t('Header.news'), link: config.routes.news.NEW + '/1' },
    { title: i18next.t('Header.text_online'), link: config.routes.text_online.TEXT_ONLINE },
    { title: i18next.t('Header.forum'), link: config.routes.forum.MYPOST },
    { title: i18next.t('Header.chat_AI'), link: config.routes.chat_ai.CHAT_AI },
    { title: i18next.t('Header.game'), link: config.routes.game.GAME },
];

export const getNavigationAdmin = () => [
    { title: i18next.t('HeaderAdmin.manage_forum'), link: config.routes.admin.MANAGEFORUM },
    { title: i18next.t('HeaderAdmin.manage_user'), link: '/manage_user/1' },
    { title: i18next.t('HeaderAdmin.manage_quizzes'), link: config.routes.admin.MANAGEQUIZZES },
    { title: i18next.t('HeaderAdmin.manage_categories'), link: '/manage_wcategories/1' },
    { title: i18next.t('HeaderAdmin.manage_news'), link: '/manage_news/1' },
    { title: i18next.t('HeaderAdmin.manage_videos'), link: '/manage_videos/1' },
];

export const getMENU_ITEMS = () => [
    {
        icon: faEarthAsia,
        title: i18next.t('Header.language'),
        children: {
            title: i18next.t('Header.language'),
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: i18next.t('Header.english'),
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: i18next.t('Header.vietnam'),
                },
            ],
        },
    },
    {
        icon: faCircleQuestion,
        title: i18next.t('Header.feedback_and_help'),
        to: '',
    },
];

export const getUserMenu = () => [
    {
        icon: faUser,
        title: i18next.t('Header.view_profile'),
        to: '',
    },
    ...getMENU_ITEMS(),
    {
        icon: faUserGear,
        title: i18next.t('Header.Admin'),
        to: '/manage_user/1',
    },
    {
        icon: faSignOut,
        title: i18next.t('Header.log_out'),
        to: '',
        separate: true,
    },
];

export const getAdminMenu = () => [
    {
        icon: faEarthAsia,
        title: i18next.t('Header.language'),
        children: {
            title: i18next.t('Header.language'),
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: i18next.t('Header.english'),
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: i18next.t('Header.vietnam'),
                },
            ],
        },
    },
    {
        icon: faUser,
        title: i18next.t('HeaderAdmin.user'),
        to: config.routes.HOME,
    },
    {
        icon: faSignOut,
        title: i18next.t('Header.log_out'),
        to: '',
        separate: true,
    },
];

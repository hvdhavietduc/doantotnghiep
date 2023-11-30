import config from '~/config';
import { faCircleQuestion, faEarthAsia, faUser, faSignOut } from '@fortawesome/free-solid-svg-icons';

export const navigation = [
    { title: 'Translation', link: config.routes.TRANSLATION },
    { title: 'WordBooks', link: '' },
    { title: 'Video', link: '' },
    { title: 'News', link: '' },
    { title: 'Text online', link: '' },
    { title: 'Forum', link: '' },
    { title: 'Chat AI', link: '' },
    { title: 'Game', link: '' },
];

export const MENU_ITEMS = [
    {
        icon: faEarthAsia,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: faCircleQuestion,
        title: 'Feedback and help',
        to: '',
    },
];

export const userMenu = [
    {
        icon: faUser,
        title: 'View profile',
        to: '',
    },
    ...MENU_ITEMS,
    {
        icon: faSignOut,
        title: 'Log out',
        to: '',
        separate: true,
    },
];

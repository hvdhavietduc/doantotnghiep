import config from '~/config';
import { faCircleQuestion, faEarthAsia, faUser, faSignOut } from '@fortawesome/free-solid-svg-icons';

export const navigation = [
    { title: 'Translation', link: config.routes.translation.TRANSLATION },
    { title: 'WordBooks', link: config.routes.wordbooks.WORDBOOKS },
    { title: 'Video', link: config.routes.video.VIDEO },
    { title: 'News', link: config.routes.news.NEWS },
    { title: 'Text online', link: config.routes.text_online.TEXT_ONLINE },
    { title: 'Forum', link: config.routes.forum.FORUM },
    { title: 'Chat AI', link: config.routes.chat_ai.CHAT_AI },
    { title: 'Game', link: config.routes.game.GAME },
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

const routes = {
    HOME: '/',
    otherPage: {
        ERROR: '*',
    },
    auth: {
        LOGIN: '/login',
        SIGNUP: '/signup',
        FORGETPASSWORD: '/forgetpassword',
        VERIFYREGISTER: '/VerifyRegister',
        CREATENEWPASSWORD: '/createnewpassword',
    },
    translation: {
        TRANSLATION: '/translation',
    },
    wordbooks: {
        WORDBOOKS: '/wordbooks/:page',
        WORDBOOK: '/wordbooks',
    },
    video: {
        VIDEO: '/video',
    },
    news: {
        NEWS: '/news',
    },
    text_online: {
        TEXT_ONLINE: '/text_online',
    },
    forum: {
        FORUM: '/forum',
    },
    chat_ai: {
        CHAT_AI: '/chat_ai',
    },
    game: {
        GAME: '/game',
    },
    lookup: {
        LOOKUP: '/lookup/:word',
    },
    admin: {
        MANAGEUSER: '/manage_user',
        MANAGEFORUM: '/manage_forum',
        MANAGEQUIZZES: '/manage_quizzes',
        MANAGECATEGORIES: '/manage_categories',
        MANAGENEWS: '/manage_news',
        MANAGEVIDEOS: '/manage_videos',
    },
};

export default routes;

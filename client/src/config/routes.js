const routes = {
    HOME: '/',
    error: {
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
        WORDBOOKS: '/wordbooks',
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
};

export default routes;

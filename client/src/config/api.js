const api = {
    auth: {
        LOGIN: 'auth/login',
        SIGNUP: 'auth/register',
        GETEMAIL: 'auth/email',
        VERIFYREGISTER: '/auth/verify',
        FORGOTPASSWORD: '/auth/forgot-password',
        RESETPASSWORD: '/auth/reset-password',
        LOGOUT: '/auth/logout',
    },
    user: {
        GETME: 'user/me',
        GETALLUSER: 'user/all',
        DELETEUSER: 'user',
    },
    lookup: {
        SEARCH: 'words/name',
        WORDCONTAIN: 'words/search',
        ADDWORDTOFOLDER: '/words/folder',
    },
    wordbooks: {
        GETALL: '/folders/all',
        CREATEFOLDER: '/folders',
        EDITFOLDER: '/folders',
        DELETEFOLDER: '/folders',
        GETALLTOADD: '/folders/all/toAdd',
        WORDINFOLDER: '/wordFolder/folder',
    },
    news: {
        GETALL: '/news/all',
        CREATE: '/news',
        EDIT: '/news',
        DELETE: '/news',
        GETDETAIL: '/news',
    },
    video: {
        GETALL: '/videos/all',
        GET: '/videos',
        CREATE: '/videos',
        EDIT: '/videos',
        DELETE: '/videos',
    },
    wordCategory: {
        GETALL: '/wordCategory/all',
        CREATE: '/wordCategory',
        EDIT: '/wordCategory',
        DELETE: '/wordCategory',
        ALLWORD: '/wordCategory',
        DELETEWORD: '/words/category',
        ADDWORD: '/words/category',
    },
    translation: {
        GETTRANSLATE: '/translate/isRelease',
        SETTRANSLATE: '/translate/isRelease',
        TRANSLATE: '/translate',
    },
};

export default api;

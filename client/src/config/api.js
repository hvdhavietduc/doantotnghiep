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
    },
    lookup: {
        SEARCH: 'words/name',
    },
    wordbooks: {
        GETALL: '/folders/all',
        CREATEFOLDER: '/folders',
        EDITFOLDER: '/folders',
        DELETEFOLDER: '/folders',
    },

};

export default api;

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
        DELETEUSER: 'user'
    },
    lookup: {
        SEARCH: 'words/name',
        WORDCONTAIN: 'words/search',
    },
    wordbooks: {
        GETALL: '/folders/all',
        CREATEFOLDER: '/folders',
        EDITFOLDER: '/folders',
        DELETEFOLDER: '/folders',
        GETALLTOADD: '/folders/all/toAdd'
    },

};

export default api;

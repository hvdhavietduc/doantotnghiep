import Login from '~/pages/Auth/Login/Login';
import Signup from '~/pages/Auth/Signup';
import ForgetPassword from '~/pages/Auth/ForgetPassword';
import VerifyRegister from '~/pages/Auth/VerifyRegister';
import CreateNewPassword from '~/pages/Auth/CreateNewPassword';
import Error from '~/pages/OtherPage/NotExist';
import Home from '~/pages/User/Home';
import Translation from '~/pages/User/Translation';
import Wordbooks from '~/pages/User/Wordbooks';
import ManageWordFolder from '~/pages/User/ManageWordFolder';
import Lookup from '~/pages/User/Lookup';
import News from '~/pages/User/News';
import NewDetail from '~/pages/User/News/NewDetail';
import Video from '~/pages/User/Video';
import VideoDetail from '~/pages/User/Video/VideoDetail';

import ManageUser from '~/pages/Admin/ManageUser';
import ManageNews from '~/pages/Admin/ManageNewsCategory/ManageNews';
import ManageVideo from '~/pages/Admin/ManageVideoCategory/ManageVideo';
import ManageWordCategory from '~/pages/Admin/ManageWordCategory';
import { DefautLayout, AdminLayout } from '~/layout';
import config from '~/config';
import ManageWord from '~/pages/Admin/ManageWordCategory/ManageWord';
import Forum from '~/pages/User/Forum';
import ManageVideoCategory from '~/pages/Admin/ManageVideoCategory';
import ManageNewsCategory from '~/pages/Admin/ManageNewsCategory';

const publicRoutes = [
    { path: config.routes.HOME, element: Home, layout: DefautLayout },
    { path: config.routes.translation.TRANSLATION, element: Translation, layout: DefautLayout },
    { path: config.routes.otherPage.ERROR, element: Error },
    { path: config.routes.lookup.LOOKUP, element: Lookup, layout: DefautLayout },
    { path: config.routes.news.NEWS, element: News, layout: DefautLayout },
    { path: config.routes.news.NEWDEDAIL, element: NewDetail, layout: DefautLayout },
    { path: config.routes.video.VIDEOS, element: Video, layout: DefautLayout },
    { path: config.routes.video.VIDEODEDAIL, element: VideoDetail, layout: DefautLayout },
];

const privateRoutes = [
    { path: config.routes.wordbooks.WORDBOOKS, element: Wordbooks, layout: DefautLayout },
    { path: config.routes.wordbooks.WORDFOLDERS, element: ManageWordFolder, layout: DefautLayout },
    { path: config.routes.forum.FORUM, element: Forum, layout: DefautLayout },
    { path: config.routes.forum.MYPOST, element: Forum, layout: DefautLayout },
    { path: config.routes.forum.COMUNITY, element: Forum, layout: DefautLayout },
];

const adminRoutes = [
    {
        path: config.routes.admin.MANAGEUSER,
        element: ManageUser,
        layout: AdminLayout,
        listBreadcrumb: [{ name: 'manage_user', link: '' }],
    },
    {
        path: config.routes.admin.MANAGENEWS,
        element: ManageNewsCategory,
        layout: AdminLayout,
        listBreadcrumb: [{ name: 'manage_news_categories', link: '' }],
    },
    {
        path: config.routes.admin.MANAGEVIDEOS,
        element: ManageVideoCategory,
        layout: AdminLayout,
        listBreadcrumb: [{ name: 'manage_video_categories', link: '' }],
    },
    {
        path: config.routes.admin.MANAGEWORDCATEGORIES,
        element: ManageWordCategory,
        layout: AdminLayout,
        listBreadcrumb: [{ name: 'manage_word_categories', link: '' }],
    },
    {
        path: config.routes.admin.MANAGEWORDINCATEGORY,
        element: ManageWord,
        layout: AdminLayout,
        listBreadcrumb: [
            { name: 'manage_word_categories', link: '/manage_wcategories/1' },
            { name: 'manage_word', link: '' },
        ],
    },
    {
        path: config.routes.admin.MANAGEVIDEOINCATEGORY,
        element: ManageVideo,
        layout: AdminLayout,
        listBreadcrumb: [
            { name: 'manage_video_categories', link: '/manage_videos/1' },
            { name: 'manage_videos', link: '' },
        ],
    },
    {
        path: config.routes.admin.MANAGENEWSINCATEGORY,
        element: ManageNews,
        layout: AdminLayout,
        listBreadcrumb: [
            { name: 'manage_news_categories', link: '/manage_news/1' },
            { name: 'manage_news', link: '' },
        ],
    },
];

const authenticationRoutes = [
    { path: config.routes.auth.LOGIN, element: Login, layout: null },
    { path: config.routes.auth.SIGNUP, element: Signup, layout: null },
    { path: config.routes.auth.FORGETPASSWORD, element: ForgetPassword, layout: null },
    { path: config.routes.auth.CREATENEWPASSWORD, element: CreateNewPassword, layout: null },
    { path: config.routes.auth.VERIFYREGISTER, element: VerifyRegister, layout: null },
];

export { publicRoutes, privateRoutes, authenticationRoutes, adminRoutes };

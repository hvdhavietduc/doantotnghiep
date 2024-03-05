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
import ManageUser from '~/pages/Admin/ManageUser';
import config from '~/config';
import { DefautLayout, AdminLayout } from '~/layout';
import ManageNews from '~/pages/Admin/ManageNews';
import ManageVideo from '~/pages/Admin/ManageVideo';

const publicRoutes = [
    { path: config.routes.HOME, element: Home, layout: DefautLayout },
    { path: config.routes.translation.TRANSLATION, element: Translation, layout: DefautLayout },
    { path: config.routes.otherPage.ERROR, element: Error },
    { path: config.routes.lookup.LOOKUP, element: Lookup, layout: DefautLayout },
];

const privateRoutes = [
    { path: config.routes.wordbooks.WORDBOOKS, element: Wordbooks, layout: DefautLayout },
    { path: config.routes.wordbooks.WORDFOLDERS, element: ManageWordFolder, layout: DefautLayout },
];

const adminRoutes = [
    { path: config.routes.admin.MANAGEUSER, element: ManageUser, layout: AdminLayout },
    { path: config.routes.admin.MANAGENEWS, element: ManageNews, layout: AdminLayout },
    { path: config.routes.admin.MANAGEVIDEOS, element: ManageVideo, layout: AdminLayout },
];

const authenticationRoutes = [
    { path: config.routes.auth.LOGIN, element: Login, layout: null },
    { path: config.routes.auth.SIGNUP, element: Signup, layout: null },
    { path: config.routes.auth.FORGETPASSWORD, element: ForgetPassword, layout: null },
    { path: config.routes.auth.CREATENEWPASSWORD, element: CreateNewPassword, layout: null },
    { path: config.routes.auth.VERIFYREGISTER, element: VerifyRegister, layout: null },
];

export { publicRoutes, privateRoutes, authenticationRoutes, adminRoutes };

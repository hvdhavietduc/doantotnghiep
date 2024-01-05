import Home from '~/pages/Home';
import Login from '~/pages/Auth/Login/Login';
import Signup from '~/pages/Auth/Signup';
import ForgetPassword from '~/pages/Auth/ForgetPassword';
import VerifyRegister from '~/pages/Auth/VerifyRegister';
import CreateNewPassword from '~/pages/Auth/CreateNewPassword';
import Error from '~/pages/OtherPage/NotExist';
import Translation from '~/pages/Translation';
import Wordbooks from '~/pages/Wordbooks';
import config from '~/config';
import { DefautLayout } from '~/layout';
import Lookup from '~/pages/Lookup';

const publicRoutes = [
    { path: config.routes.HOME, element: Home, layout: DefautLayout },
    { path: config.routes.translation.TRANSLATION, element: Translation, layout: DefautLayout },
    { path: config.routes.otherPage.ERROR, element: Error, layout: DefautLayout },

    { path: config.routes.lookup.LOOKUP, element: Lookup, layout: DefautLayout },
];

const privateRoutes = [{ path: config.routes.wordbooks.WORDBOOKS, element: Wordbooks, layout: DefautLayout }];

const authenticationRoutes = [
    { path: config.routes.auth.LOGIN, element: Login, layout: null },
    { path: config.routes.auth.SIGNUP, element: Signup, layout: null },
    { path: config.routes.auth.FORGETPASSWORD, element: ForgetPassword, layout: null },
    { path: config.routes.auth.CREATENEWPASSWORD, element: CreateNewPassword, layout: null },
    { path: config.routes.auth.VERIFYREGISTER, element: VerifyRegister, layout: null },
];

export { publicRoutes, privateRoutes, authenticationRoutes };

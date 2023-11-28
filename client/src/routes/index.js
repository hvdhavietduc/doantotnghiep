import Home from '~/pages/Home';
import Translation from '~/pages/Translation';
import Login from '~/pages/Auth/Login/Login';
import Signup from '~/pages/Auth/Signup';
import ForgetPassword from '~/pages/Auth/ForgetPassword';
import VerifyRegister from '~/pages/Auth/VerifyRegister';
import CreateNewPassword from '~/pages/Auth/CreateNewPassword';
import config from '~/config';
import { DefautLayout } from '~/layout';

const publicRoutes = [
    { path: config.routes.HOME, element: Home, layout: DefautLayout },
    { path: config.routes.LOGIN, element: Login, layout: null },
    { path: config.routes.SIGNUP, element: Signup, layout: null },
    { path: config.routes.FORGETPASSWORD, element: ForgetPassword, layout: null },
    { path: config.routes.CREATENEWPASSWORD, element: CreateNewPassword, layout: null },
    { path: config.routes.VERIFYREGISTER, element: VerifyRegister, layout: null },
    { path: config.routes.TRANSLATION, element: Translation, layout: DefautLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

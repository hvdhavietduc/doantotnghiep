import Home from '~/pages/Home';
import Translation from '~/pages/Translation';
import Login from '~/pages/Auth/Login/Login';
import Signup from '~/pages/Auth/Signup';
import ForgetPassword from '~/pages/Auth/ForgetPassword';
import ConfirmEmail from '~/pages/Auth/ConfirmEmail';
import CreateNewPassword from '~/pages/Auth/CreateNewPassword';
import config from '~/config';
import { DefautLayout } from '~/layout';

const publicRoutes = [
    { path: config.routes.HOME, element: Home },
    { path: config.routes.LOGIN, element: Login, layout: null },
    { path: config.routes.SIGNUP, element: Signup, layout: null },
    { path: config.routes.FORGETPASSWORD, element: ForgetPassword, layout: null },
    { path: config.routes.CREATENEWPASSWORD, element: CreateNewPassword, layout: null },
    { path: config.routes.CONFIRMEMAIL, element: ConfirmEmail, layout: null },
    { path: config.routes.TRANSLATION, element: Translation, layout: DefautLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

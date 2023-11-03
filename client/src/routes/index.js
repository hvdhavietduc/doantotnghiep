import Home from '~/pages/Home';
import Translation from '~/pages/Translation';
import config from '~/config';

const publicRoutes = [
    { path: config.routes.HOME, element: Home },
    { path: config.routes.TRANSLATION, element: Translation },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

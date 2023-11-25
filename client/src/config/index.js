import routes from './routes';
import api from './api';
import validateAuth from './Auth/validateAuth';
import errorMesseage from './Auth/errorMesseage';
import notification from './Auth/notification';

const config = { routes, api, validateAuth, errorMesseage, notification };

export default config;

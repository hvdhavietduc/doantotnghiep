import routes from './routes';
import api from './api';
import constantsValid from './Auth/constantsValid';
import errorMesseage from './Auth/errorMesseage';
import notification from './Auth/notification';
import language from './language';
import getParamaterHeaderSecondnary from './paramaterHeaderSecondnary';
import wordsbooks from './WordsBooks';
import manageUser from './ManageUser';

const config = {
    routes,
    api,
    constantsValid,
    errorMesseage,
    notification,
    language,
    getParamaterHeaderSecondnary,
    wordsbooks,
    manageUser
};

export default config;

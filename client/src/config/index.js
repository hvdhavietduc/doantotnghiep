import routes from './routes';
import api from './api';
import constantsValid from './Auth/constantsValid';
import errorMesseage from './Auth/errorMesseage';
import notification from './Auth/notification';
import language from './language';
import getParamaterHeaderSecondnary from './paramaterHeaderSecondnary';
import wordsbooks from './WordsBooks';
import manageWordFolder from './ManageWordFolder';
import manageUser from './ManageUser';
import lookup from './Lookup';

const config = {
    routes,
    api,
    constantsValid,
    errorMesseage,
    notification,
    language,
    getParamaterHeaderSecondnary,
    wordsbooks,
    manageWordFolder,
    manageUser,
    lookup,
};

export default config;

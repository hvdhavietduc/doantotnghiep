import notify from '~/utils/notify';
import config from '~/config';

/**
 * @param {Object-Config Logic} configLogic
 * @param {String} errorResponse
 * @returns {Show error notify}
 */
function handleError(configLogic, errorResponse) {
    const messageError = detectMessageError(configLogic, errorResponse);
    const messageNotifyGetting = configLogic.errorMesseage.getMesseageNotify();
    if (messageError) {
        notify.error(messageNotifyGetting[messageError]);
        return;
    }
    notify.error(config.errorMesseage.getMesseageNotify().ERROR_NETWORD);
    return;
}

/**
 * @param {Object-Config Logic} configLogic
 * @param {String} errorResponse
 * @returns {null|String}
 */
function detectMessageError(configLogic, errorResponse) {
    if (!errorResponse) return null;

    const { messeageLogic } = configLogic.errorMesseage;

    for (let key in messeageLogic) {
        if (errorResponse.includes(messeageLogic[key])) {
            return key;
        }
    }

    return null;
}
export default handleError;

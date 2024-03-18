import httpRequest from '~/utils/httpRequest';
import config from '~/config';

const getTranslate = async (token) => {
    const res = await httpRequest.get(config.api.translation.GETTRANSLATE, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

const setTranslate = async (data, token) => {
    const res = await httpRequest.post(config.api.translation.SETTRANSLATE, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

const translate = async (data, token) => {
    const res = await httpRequest.post(config.api.translation.TRANSLATE, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export { getTranslate, setTranslate, translate };

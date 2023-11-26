import httpRequest from '~/utils/httpRequest';
import config from '~/config';

const login = async (data) => {
    const res = await httpRequest.post(config.api.LOGIN, data);
    return res.data;
};

const signup = async (data) => {
    const res = await httpRequest.post(config.api.SIGNUP, data);
    return res.data;
};

const getEmail = async (data) => {
    const res = await httpRequest.get(config.api.GETEMAIL, {
        params: {
            username: data.username,
            password: data.password,
        },
    });
    return res.data;
};

const verify = async (data) => {
    const res = await httpRequest.post(config.api.VERIFYREGISTER, data);
    return res.data;
};

export { login, signup, getEmail, verify };

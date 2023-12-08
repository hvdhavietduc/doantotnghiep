import httpRequest from '~/utils/httpRequest';
import config from '~/config';

const login = async (data) => {
    const res = await httpRequest.post(config.api.auth.LOGIN, data);
    return res.data;
};

const signup = async (data) => {
    const res = await httpRequest.post(config.api.auth.SIGNUP, data);
    return res.data;
};

const getEmail = async (data) => {
    const res = await httpRequest.get(config.api.auth.GETEMAIL, {
        params: {
            username: data.username,
            password: data.password,
        },
    });
    return res.data;
};

const verify = async (data) => {
    const res = await httpRequest.post(config.api.auth.VERIFYREGISTER, data);
    return res.data;
};

const forgotPassword = async (data) => {
    const res = await httpRequest.post(config.api.auth.FORGOTPASSWORD, data);
    return res.data;
};

const resetPassword = async (data) => {
    const res = await httpRequest.post(config.api.auth.RESETPASSWORD, data);
    return res.data;
};

const logout = async ( token) => {
    const res = await httpRequest.post(config.api.auth.LOGOUT, null, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export { login, signup, getEmail, verify, forgotPassword, resetPassword, logout };

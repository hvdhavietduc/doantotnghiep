import httpRequest from '~/utils/httpRequest';
import config from '~/config';

const getMe = async (token) => {
    const res = await httpRequest.get(config.api.user.GETME, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

const getAllUser = async (token, page) => {
    const res = await httpRequest.get(config.api.user.GETALLUSER, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            page: page,
        },
    });
    return res.data;
}

const deleteUser = async (token, userId) => {
    const res = await httpRequest.delete(config.api.user.DELETEUSER, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            id: userId,
        },
    });
    return res.data;
}

export { getMe, getAllUser, deleteUser};

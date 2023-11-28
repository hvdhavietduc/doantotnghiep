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

export { getMe };

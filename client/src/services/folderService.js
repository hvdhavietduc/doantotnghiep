import httpRequest from '~/utils/httpRequest';
import config from '~/config';

const getFolderAll = async (token) => {
    const res = await httpRequest.get(config.api.wordbooks.GETALL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export { getFolderAll };

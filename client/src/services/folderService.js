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

const createFolder = async (data, token) => {
    const res = await httpRequest.post(config.api.wordbooks.CREATEFOLDER, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

const editFolder = async (data, token) => {
    const res = await httpRequest.put(config.api.wordbooks.EDITFOLDER, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export { getFolderAll, createFolder, editFolder };

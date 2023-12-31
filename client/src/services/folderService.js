import httpRequest from '~/utils/httpRequest';
import config from '~/config';

const getFolderAll = async (token, page = 0, size = 11) => {
    const res = await httpRequest.get(config.api.wordbooks.GETALL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            size: size,
            page: page,
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

const deleteFolder = async (data, token) => {
    const res = await httpRequest.delete(config.api.wordbooks.DELETEFOLDER, {
        params: {
            id: data.id,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export { getFolderAll, createFolder, editFolder, deleteFolder };

import httpRequest from '~/utils/httpRequest';
import config from '~/config';

const getAllVideoCategories = async (token, page = 0, size = 10) => {
    const res = await httpRequest.get(config.api.videoCategory.GETALL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            size: size,
            page: page,
        },
    });
    return res.data;
}

const deleteVideoCategory = async (token, id) => {
    const res = await httpRequest.delete(config.api.videoCategory.DELETE + '/'+id, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}

const createVideoCategory = async (data, token) => {
    const res = await httpRequest.post(config.api.videoCategory.CREATE, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}

const editVideoCategory = async (data, token) => {
    const res = await httpRequest.put(config.api.videoCategory.EDIT, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}

const getVideosCategoryById = async (token, id, page = 0, size = 10 ) => {
    const res = await httpRequest.get(config.api.videoCategory.GETBYID + '/'+id + '/videos', {
        params: {
            size: size,
            page: page,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}

export { getAllVideoCategories, deleteVideoCategory, createVideoCategory, editVideoCategory, getVideosCategoryById };
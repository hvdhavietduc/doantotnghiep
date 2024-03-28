import httpRequest from '~/utils/httpRequest';
import config from '~/config';

const getAllNewsCategories = async (token, page = 0, size = 10) => {
    const res = await httpRequest.get(config.api.newsCategory.GETALL, {
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

const deleteNewsCategory = async (token, id) => {
    const res = await httpRequest.delete(config.api.newsCategory.DELETE + '/'+id, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}

const createNewsCategory = async (data, token) => {
    const res = await httpRequest.post(config.api.newsCategory.CREATE, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}

const editNewsCategory = async (data, token) => {
    const res = await httpRequest.put(config.api.newsCategory.EDIT, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}

const getAllNewsCategoryById = async (token, id, page = 0, size = 10 ) => {
    const res = await httpRequest.get(config.api.newsCategory.GETBYID + '/'+id + '/news', {
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

export { getAllNewsCategories, deleteNewsCategory, createNewsCategory, editNewsCategory, getAllNewsCategoryById };
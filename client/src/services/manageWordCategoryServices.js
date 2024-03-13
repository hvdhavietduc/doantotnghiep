import httpRequest from '~/utils/httpRequest';
import config from '~/config';

const getAllCategory = async (token, page = 0, size = 10) => {
    const res = await httpRequest.get(config.api.wordCategory.GETALL, {
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

const deleteCategory = async (token, id) => {
    const res = await httpRequest.delete(config.api.wordCategory.DELETE + `/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

const createCategory = async (data, token) => {
    const res = await httpRequest.post(config.api.wordCategory.CREATE, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

const editCategory = async (data, token) => {
    const res = await httpRequest.put(config.api.wordCategory.EDIT, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

const getWordAllByIdCategory = async (token, categoryId, page = 0, size = 10) => {
    const res = await httpRequest.get(config.api.wordCategory.ALLWORD + `/${categoryId}/words`, {
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

const deleteWord = async (token, categoryId, wordId) => {
    const res = await httpRequest.delete(config.api.wordCategory.DELETEWORD, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: {
            categoryId: categoryId,
            wordId: wordId,
        },
    });
    return res.data;
};

const addWordToCategory = async (token, data) => {
    const res = await httpRequest.post(config.api.wordCategory.ADDWORD, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export {
    getAllCategory,
    deleteCategory,
    createCategory,
    editCategory,
    getWordAllByIdCategory,
    deleteWord,
    addWordToCategory,
};

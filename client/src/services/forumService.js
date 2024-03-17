import httpRequest from '~/utils/httpRequest';
import config from '~/config';

const getAllMyPost = async (token, page = 0, size = 5) => {
    const res = await httpRequest.get(config.api.forum.GETALLMYPOST, {
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

const createPost = async (data, token) => {
    const res = await httpRequest.post(config.api.forum.CREATEPOST, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

const deletePost = async (token, id) => {
    const res = await httpRequest.delete(config.api.forum.DELETEPOST, {
        params: {
            id: id,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

const editPost = async (data, token) => {
    const res = await httpRequest.put(config.api.forum.EDITPOST, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export { getAllMyPost, createPost, deletePost, editPost };

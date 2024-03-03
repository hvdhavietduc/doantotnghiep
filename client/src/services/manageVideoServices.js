import httpRequest from '~/utils/httpRequest';
import config from '~/config';

const getAllVideos = async (token, page = 0, size = 10) => {
    const res = await httpRequest.get(config.api.video.GETALL, {
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

const deleteVideo = async (token, id) => {
    const res = await httpRequest.delete(config.api.video.DELETE, {
        params: {
            id: id,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}

const createVideo = async (data, token) => {
    const res = await httpRequest.post(config.api.video.CREATE, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}

const editVideo = async (data, token) => {
    const res = await httpRequest.put(config.api.video.EDIT, data, {
        params: {
            id: data.id,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}

export { getAllVideos, deleteVideo, createVideo, editVideo };
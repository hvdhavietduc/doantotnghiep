import httpRequest from '~/utils/httpRequest';
import config from '~/config';

const getAllVideos = async (token, page = 0, size = 12) => {
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
};

const getDetailVideo = async (id, token) => {
    const res = await httpRequest.get(config.api.video.GET, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            id: id,
        },
    });
    return res.data;
};

export { getAllVideos, getDetailVideo };

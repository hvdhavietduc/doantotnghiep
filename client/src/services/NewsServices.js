import httpRequest from '~/utils/httpRequest';
import config from '~/config';

const getAllNews = async (token, page = 0, size = 12) => {
    const res = await httpRequest.get(config.api.news.GETALL, {
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

const getDetailNews = async (id, token) => {
    const res = await httpRequest.get(config.api.news.GETDETAIL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            id: id,
        },
    });
    return res.data;
};

export { getAllNews, getDetailNews };

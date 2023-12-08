import httpRequest from '~/utils/httpRequest';
import config from '~/config';

const search = async (data) => {
    const res = await httpRequest.get(`${config.api.lookup.SEARCH}/${data}`);
    return res.data;
};

export { search };

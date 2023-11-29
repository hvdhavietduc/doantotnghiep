import httpRequest from '~/utils/httpRequest';
import config from '~/config';

const search = async (data) => {
    const res = await httpRequest.get(config.api.auth.GETEMAIL, {
        params: {
            username: data.username,
            password: data.password,
        },
    });
    return res.data;
};

export { search };

import httpRequest from '~/utils/httpRequest';
import config from '~/config';

const search = async (data) => {
    const res = await httpRequest.get(`${config.api.lookup.SEARCH}/${data}`);
    return res.data;
};

const filetWordContain = async (key) => {
    const res = await httpRequest.get(`${config.api.lookup.WORDCONTAIN}/${key}`);
    return res.data;
}

const getListFolderToAdd = async (token) => {
    const res = await httpRequest.get(`${config.api.wordbooks.GETALLTOADD}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return res.data;
}

const addWordToFolder = async (data, token) => {
    const res = await httpRequest.post(`${config.api.lookup.ADDWORDTOFOLDER}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return res.data;
}

export { search, filetWordContain, getListFolderToAdd, addWordToFolder};

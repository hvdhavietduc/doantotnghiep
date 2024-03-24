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

const getAllPostForum = async (token, page = 0, size = 5) => {
    const res = await httpRequest.get(config.api.forum.GETALL, {
        params: {
            size: size,
            page: page,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

const getAllCommentByPostId = async (token, postId, page = 0, size = 3) => {
    const res = await httpRequest.get(config.api.forum.GETALLCMT, {
        params: {
            size: size,
            page: page,
            postId: postId,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

const createComment = async (data, token) => {
    const res = await httpRequest.post(config.api.forum.CREATECMT, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

const deleteCommentOfComment = async (token, parentId, commentId) => {
    const res = await httpRequest.delete(config.api.forum.DELETECMTOFCMT, {
        params: {
            parentId: parentId,
            commentId: commentId,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

const deleteCommentOfPost = async (token, postId, commentId) => {
    const res = await httpRequest.delete(config.api.forum.DELETECMTOFPOST, {
        params: {
            postId: postId,
            commentId: commentId,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

const getCommentOfComment = async (token, commentId, page = 0, size = 3) => {
    const res = await httpRequest.get(config.api.forum.GETCMTBYCMT, {
        params: {
            size: size,
            page: page,
            commentId: commentId,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export {
    getAllMyPost,
    createPost,
    deletePost,
    editPost,
    getAllPostForum,
    getAllCommentByPostId,
    createComment,
    deleteCommentOfComment,
    deleteCommentOfPost,
    getCommentOfComment,
};

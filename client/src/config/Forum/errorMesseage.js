import i18next from '~/utils/i18n';

const getMesseageNotify = () => ({
    ERROR_NETWORD: i18next.t('Error.error_network'),
    POST_NOT_FOUND: i18next.t('Forum.post_not_found'),
    FILE_CANNOT_EXCEDD_1MB: i18next.t('Forum.file_cannot_exceed_1mb'),
    FILE_NOT_IMAGE: i18next.t('Forum.file_not_image'),
});

const messeageLogic = { POST_NOT_FOUND: 'Post not found', FILE_CANNOT_EXCEDD_1MB: 'File can not exceed 1MB', FILE_NOT_IMAGE: 'File is not image'};

const errorMesseage = { getMesseageNotify, messeageLogic };

export default errorMesseage;

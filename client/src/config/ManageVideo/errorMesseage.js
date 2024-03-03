import i18next from '~/utils/i18n';

const getMesseageNotify = () => ({
    ERROR_NETWORD: i18next.t('Error.error_network'),
    VIDEO_NOT_FOUND: i18next.t('ManageVideo.video_not_found'),
    FILE_NOT_VIDEO: i18next.t('ManageVideo.file_not_video'),
});

const messeageLogic = { 
    VIDEO_NOT_FOUND: 'Video not found',
    FILE_NOT_VIDEO: 'File not video',
};


const errorMesseage = { getMesseageNotify, messeageLogic };

export default errorMesseage;

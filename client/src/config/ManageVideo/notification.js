import i18next from '~/utils/i18n';

const notification = () => ({
    DELETE_VIDEO_SUCCESS : i18next.t('ManageVideo.delete_video_success'),
    ADD_VIDEO_SUCCESS : i18next.t('ManageVideo.add_video_success'),
    EDIT_VIDEO_SUCCESS : i18next.t('ManageVideo.edit_video_success'),
});

export default notification;
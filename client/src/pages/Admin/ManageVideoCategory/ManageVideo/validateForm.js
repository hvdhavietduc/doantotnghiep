import i18next from '~/utils/i18n';
import config from '~/config';

const { constantsValid } = config.manageVideo;

const getValid = () => ({
    video: {
        required: i18next.t('ManageVideo.video') + i18next.t('Valid.is_required'),
    },
    title: {
        required: i18next.t('ManageVideo.title') + i18next.t('Valid.is_required'),
        minLength: {
            value: constantsValid.length.MIN_LENGTH_TITLE,
            message:
                i18next.t('ManageVideo.title') +
                i18next.t('Valid.must_least') +
                constantsValid.length.MIN_LENGTH_TITLE +
                i18next.t('Valid.characters'),
        },
        maxLength: {
            value: constantsValid.length.MAX_LENGTH_TITLE,
            message:
                i18next.t('ManageVideo.title') +
                i18next.t('Valid.must_most') +
                constantsValid.length.MAX_LENGTH_TITLE +
                i18next.t('Valid.characters'),
        },
        pattern: {
            value: constantsValid.pattern.TITLE,
            message: i18next.t('ManageNews.title') + i18next.t('Valid.contain_only_letters_number_and_spaces'),
        },
    },
    description: {
        minLength: {
            value: constantsValid.length.MIN_LENGTH_DESCRIPTION,
            message:
                i18next.t('ManageVideo.description') +
                i18next.t('Valid.must_least') +
                constantsValid.length.MIN_LENGTH_DESCRIPTION +
                i18next.t('Valid.characters'),
        },
        maxLength: {
            value: constantsValid.length.MAX_LENGTH_DESCRIPTION,
            message:
                i18next.t('ManageVideo.description') +
                i18next.t('Valid.must_most') +
                constantsValid.length.MAX_LENGTH_DESCRIPTION +
                i18next.t('Valid.characters'),
        },
    }
});

export default getValid;

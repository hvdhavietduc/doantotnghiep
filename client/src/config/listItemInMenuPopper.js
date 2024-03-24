import i18next from '~/utils/i18n';

const getListItemInMenuPopper = () => ({
    forum: {
        ItemComment: [{ code: 'delete', content: i18next.t('Forum.delete') }],
    },
});

export default getListItemInMenuPopper;

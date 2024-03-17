import i18next from '~/utils/i18n';
import { faBookOpen, faNewspaper, faVideo } from '@fortawesome/free-solid-svg-icons';

const getParamaterHeaderSecondnary = () => ({
    wordbooks: {
        iconTitle: faBookOpen,
        title: i18next.t('Header.wordbooks'),
        backgroundColor: ['rgba(253, 206, 223, 0.8)', 'rgba(191, 234, 245, 0.8)'],
        menuFilter: [
            { label: 'My folder', title: i18next.t('WordBooks.my_folder') },
            { label: 'Explore', title: i18next.t('WordBooks.explore') },
        ],
    },
    News: {
        iconTitle: faNewspaper,
        title: i18next.t('News.News'),
        backgroundColor: ['rgba(204, 238, 188, 0.8)', 'rgba(191, 234, 245, 0.8)'],
        menuFilter: [
            { label: 'Latest', title: i18next.t('News.Latest') },
            { label: 'World', title: i18next.t('News.World') },
            { label: 'Society', title: i18next.t('News.Society') },
            { label: 'Business', title: i18next.t('News.Business') },
            { label: 'Health', title: i18next.t('News.Health') },
            { label: 'Culture', title: i18next.t('News.Culture') },
            { label: 'Sport', title: i18next.t('News.Sport') },
            { label: 'Digital', title: i18next.t('News.Digital') },
            { label: 'Law', title: i18next.t('News.Law') },
        ],
    },
    Video: {
        iconTitle: faVideo,
        title: i18next.t('Video.Video'),
        backgroundColor: ['rgba(239, 98, 98, 0.8)', 'rgba(191, 234, 245, 0.8)'],
        menuFilter: [
            { label: 'All', title: i18next.t('Video.All') },
            { label: 'Music', title: i18next.t('Video.Music') },
            { label: 'Audiobook', title: i18next.t('Video.Audiobook') },
            { label: 'Cartoon', title: i18next.t('Video.Cartoon') },
            { label: 'Football', title: i18next.t('Video.Football') },
            { label: 'Entertainment', title: i18next.t('Video.Entertainment') },
            { label: 'Digital', title: i18next.t('Video.Digital') },
            { label: 'Law', title: i18next.t('Video.Law') },
        ],
    },
    Forum: {
        iconTitle: faNewspaper,
        title: i18next.t('Forum.forum'),
        backgroundColor: ['rgba(204, 238, 188, 0.8)', 'rgba(191, 234, 245, 0.8)'],
        menuFilter: [
            { label: 'My post', title: i18next.t('Forum.my_post'), namePage: 'my_post' },
            { label: 'Comunity', title: i18next.t('Forum.comunity'), namePage: 'comunity' },
        ],
    },
});

export default getParamaterHeaderSecondnary;

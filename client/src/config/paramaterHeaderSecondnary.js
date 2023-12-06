import i18next from '~/utils/i18n';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

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
});

export default getParamaterHeaderSecondnary;

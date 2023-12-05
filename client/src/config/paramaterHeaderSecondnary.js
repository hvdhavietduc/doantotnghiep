import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

const getParamaterHeaderSecondnary = () => ({
    wordbooks: {
        iconTitle: faBookOpen,
        title: 'WordBooks',
        backgroundColor: ['rgba(253, 206, 223, 0.8)', 'rgba(191, 234, 245, 0.8)'],
        menuFilter: [
            { label: 'My folder', title: 'My folder' },
            { label: 'Explore', title: 'Explore' },
        ],
    },
});

export default getParamaterHeaderSecondnary;

import { useTranslation } from 'react-i18next';
function Breadcrumb({ className, listBreadcrumb }) {
    const { t } = useTranslation('translation', { keyPrefix: 'Breadcrumb' });

    return (
        <div className={`flex ${className} p-3 px-10`} aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 rtl:space-x-reverse md:space-x-2">
                <li className="inline-flex items-center ">
                    <a
                        href="/"
                        className="inline-flex items-center text-xl font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                    >
                        <svg
                            className="me-2.5 h-5 w-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                        </svg>
                        {t('home')}
                    </a>
                </li>
                {listBreadcrumb.map((breadcrumd, index) => (
                    <li key={index}>
                        <div className="flex items-center">
                            <svg
                                className="mx-1 h-3 w-3 text-gray-400 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m1 9 4-4-4-4"
                                />
                            </svg>
                            {index !== listBreadcrumb.length - 1 && (
                                <a
                                    href={breadcrumd.link}
                                    className="ms-1 text-xl font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white md:ms-2"
                                >
                                    {t(breadcrumd.name)}
                                </a>
                            )}
                            {index === listBreadcrumb.length - 1 && (
                                <span className="ms-1 text-xl font-medium text-gray-500 dark:text-gray-400 md:ms-2">
                                    {t(breadcrumd.name)}
                                </span>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default Breadcrumb;

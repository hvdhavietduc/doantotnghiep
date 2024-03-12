import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

import { getAllNews } from '~/services/manageNewsServices';
import { useCookies } from 'react-cookie';
import notify from '~/utils/notify';
import config from '~/config';
import Loading from '~/components/Loading';
import { useTranslation } from 'react-i18next';
import Pagination from '~/components/Pagination';
import DeleteNews from './DeleteNews';
import AddNews from './AddNews';
import EditNews from './EditNew';

function ManageNews() {
    const [allNews, setAllNews] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [isPoperDeleteNews, setIsPoperDeleteNews] = useState(false);
    const [isPoperAddNews, setIsPoperAddNews] = useState(false);
    const [isPoperEditNews, setIsPoperEditNews] = useState(false);
    const [totalPage, setTotalPage] = useState(0);
    const [newsIdToDelete, setnewsIdToDelete] = useState();
    const [newsToEdit, setNewsToEdit] = useState();

    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookies] = useCookies(['token']);
    const { t } = useTranslation('translation', { keyPrefix: 'ManageNews' });

    const navigate = useNavigate();
    const location = useLocation();

    const currentPath = location.pathname;
    const currentPage = Number(currentPath.split('/')[2]);

    const getAllNewsAPI = async (page) => {
        const token = cookies.token;
        setLoading(true);

        await getAllNews(token, page - 1)
            .then((result) => {
                setAllNews(result.listNews);
                setData(result);
                setTotalPage(result.totalPage);
                setLoading(false);
            })
            .catch((error) => {
                const messeageNotify = config.errorMesseage.getMesseageNotify();
                if (!error.response) {
                    notify.error(messeageNotify.ERROR_NETWORD);
                    setLoading(false);

                    return;
                }
            });
    };

    const onPageChange = async (value) => {
        navigate(`/manage_news/${value}`);
    };

    useEffect(() => {
        if (currentPage < 1) {
            navigate('/manage_news/1');
        }
        getAllNewsAPI(currentPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const showPoperDeleteNews = (newsId) => {
        setnewsIdToDelete(newsId);
        setIsPoperDeleteNews(true);
        document.body.style.overflow = 'hidden';
    };

    const showPoperEditNews = (news) => {
        setNewsToEdit(news);
        setIsPoperEditNews(true);
        document.body.style.overflow = 'hidden';
    };

    const showPoperAddNews = () => {
        setIsPoperAddNews(true);
        document.body.style.overflow = 'hidden';
    };

    return (
        <div className="p-10">
            <button
                onClick={showPoperAddNews}
                type="button"
                className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                {t('add_news')}
            </button>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                {t('title')}
                            </th>
                            <th scope="col" className="px-6 py-3">
                                {t('content')}
                            </th>
                            <th scope="col" className="px-6 py-3">
                                {t('create_at')}
                            </th>
                            <th scope="col" className="px-6 py-3">
                                {t('update_at')}
                            </th>
                            <th scope="col" className="px-6 py-3">
                                {t('action')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allNews.map((news, index) => (
                            <tr
                                key={index}
                                className=" border-b odd:bg-white even:bg-gray-50 hover:bg-gray-100 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800 dark:hover:bg-gray-600"
                            >
                                <th
                                    scope="row"
                                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                                >
                                    {news.title}
                                </th>
                                <td className="px-6 py-4">{news.content}</td>
                                <td className="px-6 py-4">{news.createdAt}</td>
                                <td className="px-6 py-4">{news.updatedAt}</td>
                                <td className="flex cursor-pointer gap-5 px-6 py-4 ">
                                    <FontAwesomeIcon
                                        className=" text-3xl text-red-500"
                                        icon={faTrash}
                                        onClick={() => showPoperDeleteNews(news.id)}
                                    />
                                    <FontAwesomeIcon
                                        className=" text-3xl text-blue-500"
                                        icon={faEdit}
                                        onClick={() => showPoperEditNews(news)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <Pagination totalPage={totalPage} currentPage={currentPage} onPageChange={onPageChange} />
            </div>
            {loading && <Loading />}
            {isPoperDeleteNews && <DeleteNews setIsPoperDeleteNews={setIsPoperDeleteNews} newsId={newsIdToDelete} />}
            {isPoperAddNews && <AddNews setIsPoperAddNews={setIsPoperAddNews} onPageChange={onPageChange} />}
            {isPoperEditNews && (
                <EditNews setIsPoperEditNews={setIsPoperEditNews} onPageChange={onPageChange} oldNews={newsToEdit} />
            )}
        </div>
    );
}

export default ManageNews;

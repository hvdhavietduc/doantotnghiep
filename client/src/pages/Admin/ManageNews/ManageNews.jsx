import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { getAllNews } from '~/services/manageNewsServices';
import { useCookies } from 'react-cookie';
import notify from '~/utils/notify';
import config from '~/config';
import Loading from '~/components/Loading';
import { useTranslation } from 'react-i18next';
import Pagination from '~/components/Pagination';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import DeleteNews from './DeleteNews';
import AddNews from './AddNews';
import EditNews from './EditNew.jsx/EditNews';

function ManageNews() {
    const location = useLocation();
    const currentPath = location.pathname;
    const currentPage = currentPath.split('/')[2];
    const [allNews, setAllNews] = useState([]);
    const [data, setData] = useState();
    const [cookies, setCookies] = useCookies(['token']);
    const [loading, setLoading] = useState(false);
    const [isPoperDeleteNews, setIsPoperDeleteNews] = useState(false);
    const [isPoperAddNews, setIsPoperAddNews] = useState(false);
    const [isPoperEditNews, setIsPoperEditNews] = useState(false);
    const [totalPage, setTotalPage] = useState(0);
    const [newsIdToDelete, setnewsIdToDelete] = useState();
    const [newsToEdit, setNewsToEdit] = useState();
    const { t } = useTranslation('translation', { keyPrefix: 'ManageNews' });
    const navigate = useNavigate();

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
                class="text-white text-sm bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
                {t('add_news')}
            </button>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                {t('title')}
                            </th>
                            <th scope="col" class="px-6 py-3">
                                {t('content')}
                            </th>
                            <th scope="col" class="px-6 py-3">
                                {t('create_at')}
                            </th>
                            <th scope="col" class="px-6 py-3">
                                {t('update_at')}
                            </th>
                            <th scope="col" class="px-6 py-3">
                                {t('action')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allNews.map((news) => (
                            <tr class=" odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                                <th
                                    scope="row"
                                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {news.title}
                                </th>
                                <td class="px-6 py-4">{news.content}</td>
                                <td class="px-6 py-4">{news.createdAt}</td>
                                <td class="px-6 py-4">{news.updatedAt}</td>
                                <td class="px-6 py-4 flex cursor-pointer gap-5 ">
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

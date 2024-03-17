import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useReducer, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';

import Pagination from '~/components/Pagination';
import DeleteWordCategory from './DeleteWordCategory';
import AddWordCategory from './AddWordCategory';
import EditWordCategory from './EditWordCategory';
import Loading from '~/components/Loading';
import { getAllCategory } from '~/services/manageWordCategoryServices';
import notify from '~/utils/notify';
import config from '~/config';

function ManageWordCategory() {
    const [allCategory, setAllCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isPoperDeleteCategory, setIsPoperDeleteCategory] = useState(false);
    const [isPoperAddCategory, setIsPoperAddCategory] = useState(false);
    const [isPoperEditCategory, setIsPoperEditCategory] = useState(false);
    const [totalPage, setTotalPage] = useState(0);
    const [categoryIdToDelete, setCategoryIdToDelete] = useState();
    const [categoryToEdit, setCategoryToEdit] = useState();
    const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
    const { t } = useTranslation('translation', { keyPrefix: 'ManageWordCategory' });

    const [cookies] = useCookies(['token']);

    const navigate = useNavigate();

    const location = useLocation();
    const currentPath = location.pathname;
    const currentPage = Number(currentPath.split('/')[2]);

    const getAllCategoryAPI = async (page) => {
        const token = cookies.token;
        setLoading(true);

        await getAllCategory(token, page - 1)
            .then((result) => {
                setAllCategory(result.wordCategories);
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
        navigate(`/manage_wcategories/${value}`);
    };

    useEffect(() => {
        if (currentPage < 1) {
            navigate('/manage_wcategories/1');
        }
        getAllCategoryAPI(currentPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, reducerValue]);

    const showPoperDeleteCategory = (categoryId) => {
        setCategoryIdToDelete(categoryId);
        setIsPoperDeleteCategory(true);
        document.body.style.overflow = 'hidden';
    };

    const showPoperEditCategory = (category) => {
        setCategoryToEdit(category);
        setIsPoperEditCategory(true);
        document.body.style.overflow = 'hidden';
    };

    const showPoperAddCategory = () => {
        setIsPoperAddCategory(true);
        document.body.style.overflow = 'hidden';
    };

    return (
        <div className="w-full p-10">
            <button
                onClick={showPoperAddCategory}
                type="button"
                className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                {t('add_category')}
            </button>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                {t('name')}
                            </th>
                            <th scope="col" className="px-6 py-3">
                                {t('word_count')}
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
                        {allCategory.map((category, index) => (
                            <tr
                                key={index}
                                className=" border-b odd:bg-white even:bg-gray-50 hover:bg-gray-100 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800 dark:hover:bg-gray-600"
                            >
                                <th
                                    scope="row"
                                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                                >
                                    {category.name}
                                </th>
                                <td className="px-6 py-4">{category.wordIds.length}</td>
                                <td className="px-6 py-4">{category.createdAt}</td>
                                <td className="px-6 py-4">{category.updatedAt}</td>
                                <td className="flex cursor-pointer gap-5 px-6 py-4 ">
                                    <button
                                        type="button"
                                        onClick={() => navigate(`/manage_wcategories/${category.id}/1`)}
                                        className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        {t('manage_word_lists')}
                                    </button>
                                    <FontAwesomeIcon
                                        className=" text-3xl text-red-500"
                                        icon={faTrash}
                                        onClick={() => showPoperDeleteCategory(category.id)}
                                    />
                                    <FontAwesomeIcon
                                        className=" text-3xl text-blue-500"
                                        icon={faEdit}
                                        onClick={() => showPoperEditCategory(category)}
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
            {isPoperDeleteCategory && (
                <DeleteWordCategory
                    setIsPoperDeleteWordCategory={setIsPoperDeleteCategory}
                    categoryId={categoryIdToDelete}
                    forceUpdate={forceUpdate}
                />
            )}
            {isPoperAddCategory && (
                <AddWordCategory
                    setIsPoperAddWordCategory={setIsPoperAddCategory}
                    onPageChange={onPageChange}
                    forceUpdate={forceUpdate}
                />
            )}
            {isPoperEditCategory && (
                <EditWordCategory
                    setIsPoperEditWordCategory={setIsPoperEditCategory}
                    onPageChange={onPageChange}
                    oldCategory={categoryToEdit}
                    forceUpdate={forceUpdate}
                />
            )}
        </div>
    );
}

export default ManageWordCategory;

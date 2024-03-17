import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useReducer } from 'react';

import Loading from '~/components/Loading';
import DeleteWord from './DeleteWord';
import Pagination from '~/components/Pagination';
import InputSearch from '~/components/InputSearch';
import { getWordAllByIdCategory, addWordToCategory } from '~/services/manageWordCategoryServices';
import notify from '~/utils/notify';
import config from '~/config';
import handleError from '~/config/handleError';

function ManageWord() {
    const location = useLocation();
    const currentPath = location.pathname;
    const categoryId = currentPath.split('/')[2];
    const currentPage = Number(currentPath.split('/')[3]);
    const [allWord, setAllWord] = useState([]);
    const [cookies] = useCookies(['token']);
    const [loading, setLoading] = useState(false);
    const [isPoperDeleteWord, setIsPoperDeleteWord] = useState(false);
    const [totalPage, setTotalPage] = useState(0);
    const [wordIdToDelete, setWordIdToDelete] = useState();
    const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
    const { t } = useTranslation('translation', { keyPrefix: 'ManageWordCategory' });
    const navigate = useNavigate();

    const getAllWordAPI = async (page) => {
        const token = cookies.token;
        setLoading(true);

        await getWordAllByIdCategory(token, categoryId, page - 1)
            .then((result) => {
                setAllWord(result.words);
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
        navigate(`/manage_wcategories/${categoryId}/${value}`);
    };

    useEffect(() => {
        if (currentPage < 1) {
            navigate(`/manage_wcategories/${categoryId}/1`);
        }
        getAllWordAPI(currentPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, reducerValue]);

    const showPoperDeleteWord = (wordId) => {
        setWordIdToDelete(wordId);
        setIsPoperDeleteWord(true);
        document.body.style.overflow = 'hidden';
    };

    const handleAddWordToCategory = async (wordId) => {
        const data = {
            categoryId: categoryId,
            wordId: wordId,
        };
        setLoading(true);
        await addWordToCategory(cookies.token, data)
            .then(() => {
                setLoading(false);
                notify.success(config.ManageWordInCategory.notification().ADD_WORD_SUCCESS);
                forceUpdate();
            })
            .catch((error) => {
                setLoading(false);

                const messeageNotify = config.errorMesseage.getMesseageNotify();
                if (!error.response) {
                    notify.error(messeageNotify.ERROR_NETWORD);

                    return;
                }
                const configLogic = config.ManageWordInCategory;
                const { message } = error.response.data;
                handleError(configLogic, message);
            });
    };

    return (
        <div className="flex w-full flex-col items-center p-10">
            <InputSearch handleValue={handleAddWordToCategory} action={t('click_to_add')} className="m-3" />
            <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                    <thead className="bg-gray-50 text-base uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-16 py-3 text-center">
                                {t('word')}
                            </th>
                            <th scope="col" className="px-16 py-3 text-center">
                                {t('action')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allWord.map((word, index) => (
                            <tr
                                key={index}
                                className=" border-b text-base odd:bg-white even:bg-gray-50 hover:bg-gray-100 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800 dark:hover:bg-gray-600"
                            >
                                <th
                                    scope="row"
                                    className="whitespace-nowrap px-16 py-3 text-center font-medium text-gray-900 dark:text-white"
                                >
                                    {word.name}
                                </th>
                                <td className="flex cursor-pointer items-center justify-center px-16 py-3 text-center">
                                    <FontAwesomeIcon
                                        className=" text-xl text-red-500"
                                        icon={faTrash}
                                        onClick={() => showPoperDeleteWord(word.id)}
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
            {isPoperDeleteWord && (
                <DeleteWord
                    setIsPoperDeleteWOrd={setIsPoperDeleteWord}
                    wordId={wordIdToDelete}
                    forceUpdate={forceUpdate}
                />
            )}
        </div>
    );
}

export default ManageWord;

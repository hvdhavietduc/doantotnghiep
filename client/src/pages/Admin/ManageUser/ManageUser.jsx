import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';

import DeleteUser from './DeleteUser';
import Pagination from '~/components/Pagination';
import Loading from '~/components/Loading';
import { getAllUser } from '~/services/userServices';
import { useCookies } from 'react-cookie';
import notify from '~/utils/notify';
import config from '~/config';

function ManageUser() {
    const location = useLocation();
    const currentPath = location.pathname;
    const currentPage = Number(currentPath.split('/')[2]);
    const [allUser, setAllUser] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [data, setData] = useState();
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookies] = useCookies(['token']);
    const [loading, setLoading] = useState(false);
    const [isPoperDeleteUser, setIsPoperDeleteUser] = useState(false);
    const [totalPage, setTotalPage] = useState(0);
    const [userIdToDelete, setUserIdToDelete] = useState();
    const { t } = useTranslation('translation', { keyPrefix: 'ManageUser' });
    const navigate = useNavigate();

    const getAllUserAPI = async (page) => {
        const token = cookies.token;
        setLoading(true);

        await getAllUser(token, page - 1)
            .then((result) => {
                setAllUser(result.users);
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
        navigate(`/manage_user/${value}`);
    };

    useEffect(() => {
        if (currentPage < 1) {
            navigate('/manage_user/1');
        }
        getAllUserAPI(currentPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const showPoperDeleteUser = (userId) => {
        setUserIdToDelete(userId);
        setIsPoperDeleteUser(true);
        document.body.style.overflow = 'hidden';
    };

    return (
        <div className="flex flex-col items-center p-10">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                    <thead className="bg-gray-50 text-base uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-16 py-3">
                                {t('name')}
                            </th>
                            <th scope="col" className="px-16 py-3">
                                {t('username')}
                            </th>
                            <th scope="col" className="px-16 py-3">
                                {t('email')}
                            </th>
                            <th scope="col" className="px-16 py-3">
                                {t('role')}
                            </th>
                            <th scope="col" className="px-16 py-3">
                                {t('action')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUser.map((user, index) => (
                            <tr
                                key={index}
                                className=" border-b text-base odd:bg-white even:bg-gray-50 hover:bg-gray-100 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800 dark:hover:bg-gray-600"
                            >
                                <th
                                    scope="row"
                                    className="whitespace-nowrap px-16 py-3 font-medium text-gray-900 dark:text-white"
                                >
                                    {user.name}
                                </th>
                                <td className="px-16 py-3">{user.username}</td>
                                <td className="px-16 py-3">{user.email}</td>
                                <td className="px-16 py-3">{user.role}</td>
                                <td
                                    className="flex cursor-pointer px-16 py-3 "
                                    onClick={() => showPoperDeleteUser(user.id)}
                                >
                                    <FontAwesomeIcon className=" text-xl text-red-500" icon={faTrash} />
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
            {isPoperDeleteUser && <DeleteUser setIsPoperDeleteUser={setIsPoperDeleteUser} userId={userIdToDelete} />}
        </div>
    );
}

export default ManageUser;

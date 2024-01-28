import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { getAllUser } from '~/services/userServices';
import { useCookies } from 'react-cookie';
import notify from '~/utils/notify';
import config from '~/config';
import Loading from '~/components/Loading';
import DeleteUser from './DeleteUser';
import { useTranslation } from 'react-i18next';

function ManageUser() {
    const [allUser, setAllUser] = useState([]);
    const [data, setData] = useState();
    const [cookies, setCookies] = useCookies(['token']);
    const [loading, setLoading] = useState(false);
    const [isPoperDeleteUser, setIsPoperDeleteUser] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState();
    const { t } = useTranslation('translation', { keyPrefix: 'ManageUser' });

    const getAllUserAPI = async () => {
        const page = window.location.pathname.split('/')[2] - 1;
        const token = cookies.token;
        setLoading(true);

        await getAllUser(token, page)
            .then((result) => {
                setAllUser(result.users);
                setData(result);
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

    useEffect(() => {
        getAllUserAPI();
    }, []);

    const showPoperDeleteUser = (userId) => {
        setUserIdToDelete(userId);
        setIsPoperDeleteUser(true);
        document.body.style.overflow = 'hidden';
    };

    return (
        <div className="p-10">
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                {t('name')}
                            </th>
                            <th scope="col" class="px-6 py-3">
                                {t('username')}
                            </th>
                            <th scope="col" class="px-6 py-3">
                                {t('email')}
                            </th>
                            <th scope="col" class="px-6 py-3">
                                {t('role')}
                            </th>
                            <th scope="col" class="px-6 py-3">
                                {t('action')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUser.map((user) => (
                            <tr class=" text-xl odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                                <th
                                    scope="row"
                                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {user.name}
                                </th>
                                <td class="px-6 py-4">{user.username}</td>
                                <td class="px-6 py-4">{user.email}</td>
                                <td class="px-6 py-4">{user.role}</td>
                                <td class="px-6 py-4 flex cursor-pointer " onClick={() => showPoperDeleteUser(user.id)}>
                                    <FontAwesomeIcon className=" text-3xl text-red-500" icon={faTrash} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {loading && <Loading />}
            {isPoperDeleteUser && <DeleteUser setIsPoperDeleteUser={setIsPoperDeleteUser} userId={userIdToDelete} />}
        </div>
    );
}

export default ManageUser;

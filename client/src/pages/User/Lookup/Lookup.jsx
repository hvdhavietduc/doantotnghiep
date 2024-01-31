import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { search, getListFolderToAdd, addWordToFolder } from '~/services/lookupServices';
import Loading from '~/components/Loading';
import styles from './Lookup.module.scss';
import classNames from 'classnames/bind';
import TypeWord from '~/components/TypeWord';
import SynonymOrAntonym from '~/components/SynonymOrAntonym';
import { useTranslation } from 'react-i18next';
import notify from '~/utils/notify';
import { useCookies } from 'react-cookie';
import Menu from '~/layout/Header/Menu';
import { set } from 'react-hook-form';
import Dropdown from '~/components/Dropdown';
import config from '~/config';

const cx = classNames.bind(styles);

function Lookup() {
    const location = useLocation();
    const currentPath = location.pathname;
    const word = currentPath.split('/')[2];
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [haveSynonyms, setHaveSynonyms] = useState(false);
    const [haveAntonyms, setHaveAntonyms] = useState(false);
    const [isOpenAllMean, setIsOpenAllMean] = useState(false);
    const [folders, setFolders] = useState([]);
    const [cookies, setCookies] = useCookies(['token']);
    const [wordId, setWordId] = useState();

    const { t } = useTranslation('translation', { keyPrefix: 'Lookup' });

    useEffect(() => {
        setLoading(true);
        search(word)
            .then((response) => {
                setData(response);
                setLoading(false);
                setHaveSynonyms(response.synonyms.length > 0);
                setHaveAntonyms(response.antonyms.length > 0);
                setWordId(response.id);
            })
            .catch((error) => {
                setLoading(false);
                const { message } = error.response.data;
                notify.error(message);
            });
    }, [word]);

    const getListFolder = async () => {
        await getListFolderToAdd(cookies.token).then((result) => {
            setFolders(result);
        });
    };

    useEffect(() => {
        if (cookies.token) {
            getListFolder();
        }
    }, []);

    const handleAddToFolder = async (folderId) => {
        setLoading(true);
        const data = {
            wordId: wordId,
            folderId: folderId,
        };
        const messeageNotify = config.lookup.notification();
        const messeageError = config.lookup.errorMesseage;

        await addWordToFolder(data, cookies.token)
            .then((result) => {
                notify.success(messeageNotify.ADD_WORD_SUCCESS);
                setLoading(false);
            })
            .catch((error) => {
                if (!error.response) {
                    const messeageNotify = config.errorMesseage.getMesseageNotify();
                    notify.error(messeageNotify.ERROR_NETWORD);
                    setLoading(false);
                    return;
                }
                const { message } = error.response.data;
                if (message === messeageError.messeageLogic.WORD_ADREADY_EXIST_IN_FOLDER) {
                    notify.error(messeageError.getMesseageNotify().WORD_ADREADY_EXIST_IN_FOLDER);
                    setLoading(false);
                    return;
                }
            });
    };

    return (
        <div className={cx('lookup p-16 lg:px-[200px] w-full flex gap-5')}>
            {data && (
                <div className={cx('w-full md:flex gap-10')}>
                    <div className={cx(` ${haveAntonyms || haveSynonyms ? 'md:w-4/5' : 'w-full'}`)}>
                        <div className={cx('border-t-2 border-t-blue-100 w-full flex ')}>
                            <div className="w-2/3 flex flex-col gap-3">
                                <h1 className={cx('text-5xl pt-5')}>{data.name}</h1>
                                <h2 className={cx('font-bold')}>{data.types[0]?.type}</h2>
                                <div className={cx('flex gap-5')}>
                                    <div className={cx('pronunciationUS flex gap-3')}>
                                        <span className={cx('font-bold')}>US</span>
                                        <span>{data.pronunciationUS}</span>
                                    </div>
                                    <div className={cx('pronunciationUK flex gap-3')}>
                                        <span className={cx('font-bold')}>UK</span>
                                        <span>{data.pronunciationUK}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('w-1/3 flex items-end justify-end')}>
                                {cookies.token && (
                                    <Dropdown
                                        options={folders}
                                        handleFunction={handleAddToFolder}
                                        title={t('add_to_folder')}
                                    ></Dropdown>
                                )}
                            </div>
                        </div>
                        <div className={cx('border-t-2 border-t-blue-100 w-full flex flex-col gap-3')}>
                            <div
                                className={cx(
                                    'w-full border-l-2 border-l-black py-3 px-4 mt-10 bg-blue-100 flex justify-between',
                                )}
                            >
                                {t('Definition')}
                                <div className="flex items-center gap-4">
                                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 ">
                                        {t('ClickToShow')}
                                    </span>

                                    <label className="relative inline-flex items-center cursor-pointer ">
                                        <input
                                            type="checkbox"
                                            value={isOpenAllMean}
                                            className="sr-only peer"
                                            onClick={() => {
                                                setIsOpenAllMean(!isOpenAllMean);
                                            }}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none ring-2 ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            </div>
                            {data.types.map((type, index) => {
                                return (
                                    <TypeWord
                                        isOpenAllMean={isOpenAllMean}
                                        typeWord={type}
                                        index={index + 1}
                                        key={index + 1}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    {(haveSynonyms || haveAntonyms) && (
                        <div className={cx(` md:w-1/5`)}>
                            {data.synonyms.length > 0 && (
                                <SynonymOrAntonym type={t('Synonyms')} datas={data.synonyms} key={'Synonyms'} />
                            )}
                            {data.antonyms.length > 0 && (
                                <SynonymOrAntonym type={t('Antonyms')} datas={data.antonyms} key={'Antonyms'} />
                            )}
                        </div>
                    )}
                </div>
            )}
            {loading && <Loading />}
        </div>
    );
}

export default Lookup;

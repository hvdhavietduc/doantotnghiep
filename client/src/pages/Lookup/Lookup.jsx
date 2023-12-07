import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { search } from '~/services/lookupServices';
import Loading from '~/components/Loading';
import styles from './Lookup.module.scss';
import classNames from 'classnames/bind';
import TypeWord from '~/components/TypeWord';
import { set } from 'react-hook-form';
import SynonymOrAntonym from '~/components/SynonymOrAntonym';

const cx = classNames.bind(styles);

function Lookup() {
    const location = useLocation();
    const currentPath = location.pathname;
    const word = currentPath.split('/')[2];
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [haveSynonyms, setHaveSynonyms] = useState(false);
    const [haveAntonyms, setHaveAntonyms] = useState(false);

    useEffect(() => {
        setLoading(true);
        search(word).then((response) => {
            setData(response);
            setLoading(false);
            setHaveSynonyms(response.synonyms.length > 0);
            setHaveAntonyms(response.antonyms.length > 0);
        });
    }, [word]);

    return (
        <div className={cx('lookup p-16 md:px-[100px] w-full flex gap-5')}>
            {data && (
                <div className={cx('w-full md:flex gap-10')}>
                    <div className={cx(` ${haveAntonyms || haveSynonyms ? 'md:w-4/5' : 'w-full'}`)}>
                        <div className={cx('border-t-2 border-t-blue-100 w-full flex flex-col gap-3')}>
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
                        <div className={cx('border-t-2 border-t-blue-100 w-full flex flex-col gap-3')}>
                            <div className={cx('w-full border-l-2 border-l-black py-3 px-4 mt-10 bg-blue-100')}>
                                Definition
                            </div>
                            {data.types.map((type, index) => {
                                return <TypeWord typeWord={type} index={index + 1} key={index + 1} />;
                            })}
                        </div>
                    </div>
                    {(haveSynonyms || haveAntonyms) && (
                        <div className={cx(` md:w-1/5`)}>
                            {data.synonyms.length > 0 && <SynonymOrAntonym type="Synonyms" datas={data.synonyms} />}
                            {data.antonyms.length > 0 && <SynonymOrAntonym type="Antonyms" datas={data.antonyms} />}
                        </div>
                    )}
                </div>
            )}
            {loading && <Loading />}
        </div>
    );
}

export default Lookup;

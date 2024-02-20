import classNames from 'classnames/bind';
import styles from './SynonymOrAntonym.module.scss';

const cx = classNames.bind(styles);

function SynonymOrAntonym({ type, datas }) {
    return (
        <>
            <div className={cx('w-full border-l-2 border-l-black py-3 px-4 bg-blue-100')}>{type}</div>
            {datas.map((data, index) => {
                return (
                    <a href={`/lookup/${data}`} key={index + 1} >
                        <div className={cx('w-full py-3 px-4 text-blue-800 ')} key={index + 1}>
                            <span className={cx(' text-5xl')}>. </span> 
                            <span className={cx(' hover:border-blue-300 hover:border-b-2')}>{data}</span>
                        </div>
                    </a>
                );
            })}
        </>
    );
}

export default SynonymOrAntonym;

import classNames from 'classnames/bind';
import styles from './SynonymOrAntonym.module.scss';

const cx = classNames.bind(styles);

function SynonymOrAntonym({ type, datas }) {
    return (
        <>
            <div className={cx('w-full border-l-2 border-l-black bg-blue-100 px-4 py-2')}>{type}</div>
            {datas.map((data, index) => {
                return (
                    <a href={`/lookup/${data}`} key={index + 1}>
                        <div className={cx('w-full px-4 py-1 text-blue-800 ')} key={index + 1}>
                            <span className={cx(' text-3xl')}>. </span>
                            <span className={cx(' hover:border-b-2 hover:border-blue-300')}>{data}</span>
                        </div>
                    </a>
                );
            })}
        </>
    );
}

export default SynonymOrAntonym;

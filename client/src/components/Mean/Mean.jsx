import classNames from 'classnames/bind';
import styles from './Mean.module.scss';
import Example from '../Example';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Mean({ isOpenAllMean, mean, index }) {
    const [isOpenVietnamese, setIsOpenVietnamese] = useState(isOpenAllMean);

    useEffect(() => {
        setIsOpenVietnamese(isOpenAllMean);
    }, [isOpenAllMean]);

    const toggle = () => {
        setIsOpenVietnamese(!isOpenVietnamese);
    };

    return (
        <div className={cx('m-5 my-10 justify-center')} key={index}>
            {mean.level !== '' && <span className={cx('p-5 bg-blue-100 rounded-full')}>{mean.level}</span>}
            <span className={cx(' font-bold')}> {mean.conceptEnglish} </span>
            <button onClick={() => toggle()} className=" hover:bg-blue-100 hover:rounded-lg">
                <FontAwesomeIcon icon={faCaretUp} className={`mx-3 text-2xl ${isOpenVietnamese ? 'hidden' : ''}`} />
                <FontAwesomeIcon icon={faCaretDown} className={`mx-3 text-2xl ${isOpenVietnamese ? '' : 'hidden'}`} />
            </button>
            <br />
            <span
                className={cx(
                    `italic p-3  bg-yellow-100 ${isOpenVietnamese ? '' : 'hidden'} ${mean.level !== '' ? 'mx-20' : ''}`,
                )}
            >
                ("đây là nghĩa tiếng việt sẽ sửa sau khi có api")
            </span>
            <div className={cx('flex flex-col gap-5 p-10')}>
                {mean.examples.map((example, index) => {
                    return <Example isOpenAllMean={isOpenAllMean} example={example}></Example>;
                })}
            </div>
        </div>
    );
}
export default Mean;

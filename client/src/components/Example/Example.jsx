import classNames from 'classnames/bind';
import styles from './Example.module.scss';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretLeft, faCaretRight, faCaretUp } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Example({ isOpenAllMean, example, index }) {
    const [isOpenVietnamese, setIsOpenVietnamese] = useState(isOpenAllMean);

    useEffect(() => {
        setIsOpenVietnamese(isOpenAllMean);
    }, [isOpenAllMean]);

    const toggle = () => {
        setIsOpenVietnamese(!isOpenVietnamese);
    };

    return (
        <div className={cx('gap-5 md:flex')} key={index}>
            <span className={cx('text-5xl')}>.</span>
            <span className={cx('p-3 italic ')}>{example.example} </span>
            <button onClick={() => toggle()} className=" hover:rounded-lg hover:bg-blue-100">
                <FontAwesomeIcon icon={faCaretLeft} className={`mx-3 text-2xl ${isOpenVietnamese ? 'hidden' : ''}`} />
                <FontAwesomeIcon icon={faCaretRight} className={`mx-3 text-2xl ${isOpenVietnamese ? '' : 'hidden'}`} />
            </button>
            <p className={cx(`bg-yellow-50 p-3 italic ${isOpenVietnamese ? '' : 'hidden'}`)}>
                ("đây là nghĩa tiếng việt sẽ sửa sau khi có api")
            </p>
        </div>
    );
}
export default Example;

import classNames from 'classnames/bind';
import styles from './TypeWord.module.scss';
import Mean from '../Mean';

const cx = classNames.bind(styles);

function TypeWord({ isOpenAllMean, typeWord, index }) {
    return (
        <div className={cx('flex flex-col')}>
            <span className={cx(' font-bold')}>
                {index}. {typeWord.type}
            </span>
            <div>
                {typeWord.means.map((mean, index) => {
                    return <Mean mean={mean} index={index} isOpenAllMean={isOpenAllMean}></Mean>;
                })}
            </div>
        </div>
    );
}
export default TypeWord;

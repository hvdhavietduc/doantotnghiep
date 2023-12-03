import classNames from 'classnames/bind';
import styles from './TypeWord.module.scss';

const cx = classNames.bind(styles);

function TypeWord({ word ,typeWord, index }) {

    return (
        <div className={cx('flex flex-col')}>
            <span className={cx(' font-bold')}>
                {index}. {typeWord.type}
            </span>
            <div>
                {typeWord.means.map((mean, index) => {
                    return (
                        <div className={cx('m-5 my-10 ')} key={index}>
                            {mean.level !== '' && (
                                <span className={cx('p-5 bg-blue-100 rounded-full')}>{mean.level}</span>
                            )}
                            <span className={cx(' font-bold')}> {mean.conceptEnglish} </span>
                            <br />
                            <br />
                            <span className={cx(`italic p-3  bg-yellow-100 ${mean.level !== ''? 'mx-20':''}`)}>
                                ("đây là nghĩa tiếng việt sẽ sửa sau khi có api")
                            </span>
                            <div className={cx('flex flex-col gap-5 p-10')}>
                                {mean.examples.map((example, index) => {
                                    return (
                                        <div className={cx('flex gap-5')} key={index}>
                                            <span className={cx('text-5xl')}>.</span>
                                            <span className={cx('italic p-3 ')}>{example.example}</span>
                                            <span className={cx('italic p-3 bg-yellow-50')}>
                                                {' '}
                                                ("đây là nghĩa tiếng việt sẽ sửa sau khi có api")
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default TypeWord;

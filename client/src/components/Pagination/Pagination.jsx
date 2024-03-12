import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import styles from './Pagination.module.scss';

const cx = classNames.bind(styles);

function Pagination({ totalPage, currentPage, onPageChange }) {
    const findFirstIndex = (currentPage) => {
        if (totalPage < 5 || currentPage <= 2) {
            return 1;
        }
        if (currentPage > 2 && currentPage + 2 < totalPage) {
            return currentPage - 2;
        }
        if (currentPage > 2 && currentPage + 2 >= totalPage) {
            return totalPage - 4;
        }
    };

    const firstIndex = findFirstIndex(currentPage);
    const lastIndex = firstIndex + 4 < totalPage ? firstIndex + 4 : totalPage;
    const arrPagination = Array.from({ length: lastIndex - firstIndex + 1 }, (_, index) => index + firstIndex);

    return (
        <div className={cx('mb-10 mt-10 flex flex-row justify-center')}>
            <button
                className={cx(
                    'ml-[6px] mr-[6px] block h-[35px] w-[35px] rounded-[3px] border border-solid border-blue-950',
                    'item',
                    {
                        disabled: currentPage === 1 || totalPage === 0,
                    },
                )}
                onClick={() => onPageChange(currentPage - 1)}
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            {arrPagination.map((value, index) => (
                <button
                    key={index}
                    className={cx('item', {
                        active: currentPage === value,
                        disabled: currentPage === value,
                    })}
                    onClick={() => onPageChange(value)}
                >
                    {value}
                </button>
            ))}

            <button
                className={cx('item', {
                    disabled: currentPage === totalPage || totalPage === 0,
                })}
                onClick={() => onPageChange(currentPage + 1)}
            >
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
    );
}

Pagination.propTypes = {
    totalPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;

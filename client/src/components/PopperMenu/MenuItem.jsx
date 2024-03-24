import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '~/components/Button';

const cx = classNames;

function MenuItem({ data, onClick }) {
    const classes = cx(
        'w-full !justify-start rounded-none py-[11px] px-4 leading-4 font-semibold ml-0',
        'hover:bg-background-color-secondnary',
        {
            'border-t border-solid border-stone-300': data.separate,
        },
    );
    return (
        <Button className={classes} onClick={() => onClick(data)}>
            {data.content}
        </Button>
    );
}

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default MenuItem;

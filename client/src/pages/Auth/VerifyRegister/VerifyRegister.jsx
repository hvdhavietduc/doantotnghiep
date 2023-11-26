import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Input from '~/components/Input';
import styles from './VerifyRegister.module.scss';
import WrapperAuth from '~/components/WrapperAuth';
import Button from '~/components/Button';
import { getEmail } from '~/services/authServices';
import { verifyRegisterUser } from '~/redux/userSlice';
import config from '~/config';

const cx = classNames.bind(styles);

function VerifyRegister() {
    const { loading, user } = useSelector((state) => state.user);

    const [email, setEmail] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();

    const onSubmit = (formData, e) => {};

    useEffect(() => {
        const data = {};
        data.username = user.username;
        data.password = user.password;
        getEmail(data)
            .then((result) => {
                setEmail(result);
                localStorage.clear();
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <WrapperAuth title="Verify Register" verifyPage>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={cx('message')}>We have send code to your email successfully</div>
                <Input
                    name={'code'}
                    placeholder={'Enter code'}
                    autoComplete={'one-time-code'}
                    {...register('code')}
                    errolMesseage={errors.code?.message}
                />
                <Button className={cx('btn')} primary rounded>
                    Confirm
                </Button>
            </form>
        </WrapperAuth>
    );
}

export default VerifyRegister;

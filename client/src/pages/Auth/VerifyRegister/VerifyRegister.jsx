import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Input from '~/components/Input';
import styles from './VerifyRegister.module.scss';
import WrapperAuth from '~/components/WrapperAuth';
import Button from '~/components/Button';
import { getEmail } from '~/services/authServices';
import httpRequest from '~/utils/httpRequest';
import config from '~/config';

const cx = classNames.bind(styles);

function VerifyRegister() {
    const [email, setEmail] = useState('');
    useEffect(() => {
        const data = {};
        data.username = localStorage.getItem('username');
        data.password = localStorage.getItem('password');
        // getEmail(data).then((result) => {
        //     console.log(result);
        // });
        console.log(data);
        // axios
        //     .get('http://localhost:8080/api/auth/email', {
        //         username: data.username,
        //         password: data.password,
        //     })
        //     .then((result) => {
        //         console.log(result);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
        // axios({
        //     method: 'get',
        //     url: 'http://localhost:8080/api/auth/email',
        //     data: {
        //         username: data.username,
        //         password: data.password,
        //     },
        // });
    }, []);
    return (
        <WrapperAuth title="Verify Register">
            <form>
                <div className={cx('message')}>We have send code to your email successfully</div>
                <Input placeholder={'Enter code'} />
                <Button className={cx('btn')} primary rounded>
                    Confirm
                </Button>
            </form>
        </WrapperAuth>
    );
}

export default VerifyRegister;

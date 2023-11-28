import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = {
    success: (messeage) => {
        toast.success(messeage, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    },
    error: (messeage) => {
        toast.error(messeage, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    },
};

export default notify;

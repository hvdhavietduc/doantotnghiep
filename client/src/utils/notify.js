import { toast } from 'react-toastify';

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
};

export default notify;

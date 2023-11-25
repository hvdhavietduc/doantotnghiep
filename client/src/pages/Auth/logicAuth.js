import config from '~/config';

const { validateAuth } = config;

const valid = {
    fullName: {
        required: 'Full Name is required',
        minLength: {
            value: validateAuth.length.MIN_LENGTH_NAME,
            message: 'Full Name should least' + validateAuth.length.MIN_LENGTH_NAME + 'characters.',
        },
        maxLength: {
            value: validateAuth.length.MAX_LENGTH_NAME,
            message: 'Full Name should most ' + validateAuth.length.MAX_LENGTH_NAME + ' characters.',
        },
        pattern: {
            value: validateAuth.pattern.FULLNAME,
            message: 'Full Name contain only letters and spaces.s',
        },
    },
    userName: {
        required: 'Username is required',
        minLength: {
            value: validateAuth.length.MIN_LENGTH_NAME,
            message: 'Email should least' + validateAuth.length.MIN_LENGTH_NAME + 'characters.',
        },
        maxLength: {
            value: validateAuth.length.MAX_LENGTH_NAME,
            message: 'Email should most ' + validateAuth.length.MAX_LENGTH_NAME + ' characters.',
        },
        pattern: {
            value: validateAuth.pattern.USERNAME,
            message: 'Username include letters, numbers, and underscores',
        },
    },
    email: {
        required: 'Email is required',
        pattern: {
            value: validateAuth.pattern.EMAIL,
            message: 'Invalid email address',
        },
    },
    password: {
        required: 'Password is required',
        minLength: {
            value: validateAuth.length.MIN_LENGTH_PASSWORD,
            message: 'Password should least' + validateAuth.length.MIN_LENGTH_PASSWORD + 'characters.',
        },
        maxLength: {
            value: validateAuth.length.MAX_LENGTH_PASSWORD,
            message: 'Password should most ' + validateAuth.length.MAX_LENGTH_PASSWORD + ' characters.',
        },
        // pattern: {
        //     value: validateAuth.pattern.PASSWORD,
        //     message: 'Password include at least one letter, one number, and one special character.',
        // },
    },
    passwordConfirm: {
        minLength: {
            value: validateAuth.length.MIN_LENGTH_PASSWORD,
            message: 'Password Confirm should least' + validateAuth.length.MIN_LENGTH_PASSWORD + 'characters.',
        },
        maxLength: {
            value: validateAuth.length.MAX_LENGTH_PASSWORD,
            message: 'Password Confirm should most ' + validateAuth.length.MAX_LENGTH_PASSWORD + ' characters.',
        },
        required: 'Password comfirm is required',
    },
};

export default valid;

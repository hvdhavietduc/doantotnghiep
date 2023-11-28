import config from '~/config';

const { constantsValid } = config;

const valid = {
    fullName: {
        required: 'Full Name is required',
        minLength: {
            value: constantsValid.length.MIN_LENGTH_NAME,
            message: 'Full Name should least ' + constantsValid.length.MIN_LENGTH_NAME + ' characters.',
        },
        maxLength: {
            value: constantsValid.length.MAX_LENGTH_NAME,
            message: 'Full Name should most ' + constantsValid.length.MAX_LENGTH_NAME + ' characters.',
        },
        pattern: {
            value: constantsValid.pattern.FULLNAME,
            message: 'Full Name contain only letters and spaces.s',
        },
    },
    userName: {
        required: 'Username is required',
        minLength: {
            value: constantsValid.length.MIN_LENGTH_NAME,
            message: 'Username should least ' + constantsValid.length.MIN_LENGTH_NAME + ' characters.',
        },
        maxLength: {
            value: constantsValid.length.MAX_LENGTH_NAME,
            message: 'Username should most ' + constantsValid.length.MAX_LENGTH_NAME + ' characters.',
        },
        pattern: {
            value: constantsValid.pattern.USERNAME,
            message: 'Username include letters, numbers, and underscores',
        },
    },
    email: {
        required: 'Email is required',
        pattern: {
            value: constantsValid.pattern.EMAIL,
            message: 'Invalid email address',
        },
    },
    password: {
        required: 'Password is required',
        minLength: {
            value: constantsValid.length.MIN_LENGTH_PASSWORD,
            message: 'Password should least ' + constantsValid.length.MIN_LENGTH_PASSWORD + ' characters.',
        },
        maxLength: {
            value: constantsValid.length.MAX_LENGTH_PASSWORD,
            message: 'Password should most ' + constantsValid.length.MAX_LENGTH_PASSWORD + ' characters.',
        },
        pattern: {
            value: constantsValid.pattern.PASSWORD,
            message: 'Password include at least one letter, one number, and one special character.',
        },
    },
    passwordConfirm: {
        minLength: {
            value: constantsValid.length.MIN_LENGTH_PASSWORD,
            message: 'Password Confirm should least ' + constantsValid.length.MIN_LENGTH_PASSWORD + ' characters.',
        },
        maxLength: {
            value: constantsValid.length.MAX_LENGTH_PASSWORD,
            message: 'Password Confirm should most ' + constantsValid.length.MAX_LENGTH_PASSWORD + ' characters.',
        },
        required: 'Password comfirm is required',
    },
    code: {
        minLength: {
            value: constantsValid.length.MIN_LENGTH_CODE,
            message: 'Code should least' + constantsValid.length.MIN_LENGTH_PASSWORD + ' characters.',
        },
        maxLength: {
            value: constantsValid.length.MAX_LENGTH_CODE,
            message: 'Code should most ' + constantsValid.length.MAX_LENGTH_PASSWORD + ' characters.',
        },
        required: 'Code is required',
    },
};

export default valid;

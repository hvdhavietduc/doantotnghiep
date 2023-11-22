const valid = {
    fullName: {
        required: 'fullName is required',
        minLength: {
            value: 6,
            message: 'fullName should least 6 characters',
        },
        pattern: {
            value: /^[a-zA-Z\s]/,
            message: 'fullName  contain only letters and spaces.s',
        },
    },
    userName: {
        required: 'username is required',
        minLength: {
            value: 6,
            message: 'username should least 6 characters',
        },
        pattern: {
            value: /^[a-zA-Z0-9_]/,
            message: 'username include letters, numbers, and underscores',
        },
    },
    email: {
        required: 'email is required',
        pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email address',
        },
    },
    password: {
        required: 'password is required',
        minLength: {
            value: 8,
            message: 'password should least 8 characters',
        },
        maxLength: {
            value: 20,
            message: 'password should most 20 characters',
        },
        pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
            message: 'password include at least one letter, one number, and one special character.',
        },
    },
    passwordConfirm: {
        required: 'password comfirm is required',
    },
};

export { valid };

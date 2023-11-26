const validateAuth = {
    length: {
        MIN_LENGTH_NAME: 6,
        MAX_LENGTH_NAME: 30,
        MIN_LENGTH_PASSWORD: 6,
        MAX_LENGTH_PASSWORD: 20,
    },
    pattern: {
        FULLNAME: /^[a-zA-Z\s]/,
        USERNAME: /^[a-zA-Z0-9_]/,
        PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
        EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
};

export default validateAuth;

const validate = {
    length: {
        MIN_LENGTH_NAME: 1,
        MAX_LENGTH_NAME: 100,
    },
    pattern: {
        TITLE: /^[0-9a-zA-Z\s]/,
    },
};

export default validate;

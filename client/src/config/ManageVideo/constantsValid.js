const validate = {
    length: {
        MIN_LENGTH_TITLE: 4,
        MAX_LENGTH_TITLE: 50,
        MIN_LENGTH_DESCRIPTION: 1,
        MAX_LENGTH_DESCRIPTION: 5000,
    },
    pattern: {
        TITLE: /^[0-9a-zA-Z\s]/,
    },
};

export default validate;

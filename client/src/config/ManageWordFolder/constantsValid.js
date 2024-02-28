const validate = {
    length: {
        MIN_LENGTH_TITLE: 2,
        MAX_LENGTH_TITLE: 50,
        MIN_LENGTH_DEFINITION: 8,
        MAX_LENGTH_DEFINITION: 100,
        MIN_LENGTH_WORDTYPE: 1,
        MAX_LENGTH_WORDTYPE: 6,
        MIN_LENGTH_SPELL: 3,
        MAX_LENGTH_SPELL: 20,
        MIN_LENGTH_EXAMPLES: 3,
        MIN_LENGTH_NOTE: 3,
        MAX_LENGTH_NOTE: 100,
    },
    pattern: {
        TITLE: /^[0-9a-zA-Z\s]/,
    },
};

export default validate;

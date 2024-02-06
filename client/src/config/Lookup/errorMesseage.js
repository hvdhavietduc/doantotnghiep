import i18next from '~/utils/i18n';

const getMesseageNotify = () => ({
    WORD_ADREADY_EXIST_IN_FOLDER: i18next.t('Lookup.word_aldready_exist_in_folder'),
});

const messeageLogic = {
    WORD_ADREADY_EXIST_IN_FOLDER: 'Word already exist in folder',
};

const errorMesseage = { getMesseageNotify, messeageLogic };

export default errorMesseage;

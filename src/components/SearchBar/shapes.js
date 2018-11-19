// Core
import { object, string } from 'yup';

const isRequired    = `Строка поиска не должна быть пустой !`;
const max50         = `Строка поиска не должна диннее 50 символов !`;
const min3          = `Строка поиска должна содержать минимум 3 символа !`;

export const searchString = {
    shape: {
        searchString: '',
    },
    schema: object().shape({
        searchString: string()
            .required(isRequired)
            .min(3, min3)
            .max(50, max50),
    }),
};
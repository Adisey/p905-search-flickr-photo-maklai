// Core
import { object, string } from 'yup';

const isRequired    = `Строка поиска не должна быть пустой !`;
const max50         = `Строка поиска не должна диннее 50 символов !`;
const min3          = `Строка поиска содержать минимум 3 символа !`;

export const searchString = {
    shape: {
        strSearch: 'Adisey-',
    },
    schema: object().shape({
        strSearch: string()
            .required(isRequired)
            .min(3, min3)
            .max(50, max50),
    }),
};
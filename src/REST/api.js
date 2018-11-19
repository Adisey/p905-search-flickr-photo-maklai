import { SEARCH_URL } from "./config.js";

export const api = {
    async fetchPhoto (searchString, page = 1) {
        const url = `${SEARCH_URL}&text=${searchString}&page=${page}`;
        const response = await fetch(url, {
            method: "GET",
        });

        if (response.status !== 200) {
            const { data } = await response.json();

            throw new Error(`Photos where not loaded. Status: ${response.status}, Code: ${data.code}, Message: ${data.message}`);
        }
        const data  = await response.json();
        return data;
    },
};

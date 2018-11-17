import { SEARCH_URL } from "./config.js";

export const api = {
    async searchPhoto (strSearch) {
        const url = `${SEARCH_URL}&text=${strSearch}` ;
        // console.log(`API searchPhoto -> "url" -> `, url);
        const response = await fetch(url, {
            method: "GET",
        });

        if (response.status !== 200) {
            const { data } = await response.json();
            throw new Error(`Photos where not loaded. Status: ${response.status}, Code: ${data.code}, Message: ${data.message}`);
        }
        const  data  = await response.json();
        // console.log(`API searchPhoto -> "data" -> `, data);

        return data;
    },
};

// Core
import { flickr } from "./key/flickr";
const per_page = '10';
const ROOT_URL = 'https://api.flickr.com/services/rest/';
const MAIN_URL =  `${ROOT_URL}?api_key=${flickr.Key}&format=json&nojsoncallback=1`;
const SEARCH_URL =  `${MAIN_URL}&method=flickr.photos.search&per_page=${per_page}`;

export { SEARCH_URL };

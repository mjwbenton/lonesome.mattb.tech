import * as request from 'request-promise-native';

const FLICKR_API_BASE_URL = 'https://api.flickr.com/services/rest/';
const FLICKR_BASE_PARAMETERS = '?format=json&nojsoncallback=1';

export default async function callFlickr(apiKey : string, methodName : string,
                          params : { [key : string] : string }, retryNumber: number = 0): Promise<any> {
    let url = FLICKR_API_BASE_URL + FLICKR_BASE_PARAMETERS
        + `&api_key=${apiKey}&`;
    let paramsStr = `method=${methodName}`;
    Object.keys(params).forEach((key) => {
        const value = params[key];
        paramsStr += `&${key}=${value}`;
    });
    url += paramsStr;
    try {
        console.log(url);
        return request(url).then(JSON.parse);
    } catch (err) {
        if (retryNumber < 2) {
            return callFlickr(apiKey, methodName, params, retryNumber + 1);
        }
        throw err;
    }
}

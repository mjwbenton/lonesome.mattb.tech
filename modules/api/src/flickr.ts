import * as request from 'request-promise-native';

const FLICKR_API_BASE_URL = 'https://api.flickr.com/services/rest/';
const FLICKR_BASE_PARAMETERS = '?format=json&nojsoncallback=1';

export async function callFlickr(apiKey : string, methodName : string,
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
        return request(url).then(JSON.parse);
    } catch (err) {
        if (retryNumber < 2) {
            return callFlickr(apiKey, methodName, params, retryNumber + 1);
        }
        throw err;
    }
}

export interface PhotoSource {
    url: string,
    width: number,
    height: number,
}

export interface RecentPhoto {
    pageUrl: string,
    title: string,
    mainSource: PhotoSource,
    sources: PhotoSource[]
}

const FLICKR_URL_BASE = "https://www.flickr.com/photos/";

export async function getRecentPhotos(apiKey: string, user_id: string): Promise<RecentPhoto[]> {
    const response = await callFlickr(process.env.FLICKR_API_KEY, "flickr.people.getPublicPhotos", {
        user_id: "83914470@N00",
        extras: "url_z, url_c, url_l, url_k",
        per_page: "50"
    });
    return response.photos.photo.map((p) => ({
        pageUrl: `${FLICKR_URL_BASE}${p.owner}/${p.id}/`,
        title: p.title,
        mainSource: {
            url: p.url_c,
            height: p.height_c,
            width: p.width_c
        },
        sources: buildSources(p)
    }));
}

function buildSources(photoResponse: any): PhotoSource[] {
    const result: PhotoSource[] = [];
    Object.keys(photoResponse).forEach((key) => {
        if (key.startsWith("url_")) {
            const sizeKey = key.replace("url_", "");
            result.push({
                url: photoResponse[key],
                height: photoResponse[`height_${sizeKey}`],
                width: photoResponse[`width_${sizeKey}`],
            });
        }
    });
    return result;
}


import callFlickr from "./flickr";
import * as dotenv from 'dotenv';

dotenv.config();

export async function handler(event: any, context: any, callback: any) {
    console.log(process.env.FLICKR_API_KEY);
    callback(null, await callFlickr(process.env.FLICKR_API_KEY, "flickr.people.getPublicPhotos", {
        "user_id": "83914470@N00"
    }));
}

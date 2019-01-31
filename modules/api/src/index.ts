import { getRecentPhotos } from "@mattb.tech/flickr-api";
import * as dotenv from "dotenv";

dotenv.config();

export async function handler(event: any, context: any, callback: any) {
  const response = await getRecentPhotos(
    process.env.FLICKR_API_KEY,
    "83914470@N00"
  );
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(response),
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  });
}

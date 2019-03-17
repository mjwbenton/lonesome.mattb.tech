import * as dotenv from "dotenv";
import { getRecentPhotos, getPhotoSet, getPhoto } from "@mattb.tech/flickr-api";
import { ApolloServer, gql } from "apollo-server-lambda";

dotenv.config();

const { FLICKR_API_KEY } = process.env;
const USER_ID = "83914470@N00";

if (!FLICKR_API_KEY) {
  throw new Error("Missing flickr API key");
}

const typeDefs = gql`
  type Query {
    recentPhotos: [Photo]
    photoSet(photosetId: ID): [Photo]
    photo(photoId: ID): Photo
  }

  type Photo {
    id: ID
    pageUrl: String
    title: String
    mainSource: PhotoSource
    sources: [PhotoSource]
  }

  type PhotoSource {
    url: String
    width: Int
    height: Int
  }
`;

const resolvers = {
  Query: {
    recentPhotos: () => getRecentPhotos(FLICKR_API_KEY, USER_ID),
    photoSet: (parent: never, args: any) =>
      getPhotoSet(FLICKR_API_KEY, args.photosetId),
    photo: (parent: never, args: any) => getPhoto(FLICKR_API_KEY, args.photoId)
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

exports.handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: false
  }
});

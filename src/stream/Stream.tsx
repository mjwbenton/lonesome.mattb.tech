import React, { useState, useEffect } from "react";
import { Photo } from "@mattb.tech/gatsby-transform-flickr-set";
import SinglePhoto from "../photo/Photo";

const ENDPOINT =
  "https://umpghq4xo2.execute-api.us-east-1.amazonaws.com/Prod/photos";

const Stream = () => {
  const [photos, setPhotos] = useState(null as Array<Photo> | null);
  useEffect(() => {
    if (photos == null) {
      fetch(ENDPOINT)
        .then(response => response.json())
        .then(setPhotos);
    }
  });

  if (photos == null) {
    return <span>"Loading..."</span>;
  }
  return (
    <div>
      {photos.map(p => (
        <div key={p.pageUrl}>
          <SinglePhoto {...p} key={p.pageUrl} />
        </div>
      ))}
    </div>
  );
};

export default Stream;

import React, { useState, useEffect } from "react";
import { Photo } from "@mattb.tech/gatsby-transform-flickr-set";
import SinglePhoto from "./Photo";

const ENDPOINT =
  "https://umpghq4xo2.execute-api.us-east-1.amazonaws.com/Prod/photos";

const Stream = () => {
  const [photos, setPhotos] = useState(null as Array<Photo> | null);
  useEffect(() => {
    const response = fetch(ENDPOINT)
      .then(response => response.json())
      .then(setPhotos);
  });

  if (photos == null) {
    return <span>"Loading..."</span>;
  }
  return (
    <div className="mb-photos">
      <ul>
        {photos.map(p => (
          <li key={p.pageUrl}>
            <SinglePhoto {...p} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stream;

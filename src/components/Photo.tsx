import * as React from 'react';
import {Photo} from "staircase-generator/features";

const Photo: React.SFC<Photo> = ({pageUrl, sources, mainSource, title}) => {
    return <div className="mb-photo" >
        <img className="mb-photo__image" src={mainSource.url}
             alt={`Image titled "${title}"`}/>
        <div className="mb-photo__overlay">
            <h3 className="mb-photo__overlay__title">{title}</h3>
            <a className="mb-photo__overlay__flickr-link" href={pageUrl}
                 title="Flickr Page">Fl</a>
        </div>
    </div>;
};
export default Photo;

import * as React from 'react';
import {Photo as PhotoType, PhotoSource} from "staircase-generator/features";

function generateSrcSet(sources: PhotoSource[]): string {
    return sources.map((source: PhotoSource) => [source.url, " ", source.width, "w"].join("")).join(", ");
}

const Photo: React.SFC<PhotoType> = ({pageUrl, sources, mainSource, title}) => {
    return <div className="mb-photo" >
        <img className="mb-photo__image" src={mainSource.url} srcSet={generateSrcSet(sources)}
             sizes="(max-width: 1090px) 100vw, 63vw" alt={`Image titled "${title}"`}/>
        <div className="mb-photo__overlay">
            <h3 className="mb-photo__overlay__title">{title}</h3>
            <a className="mb-photo__overlay__flickr-link" href={pageUrl}
                 title="Flickr Page">Fl</a>
        </div>
    </div>;
};
export default Photo;

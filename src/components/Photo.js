/* @flow */

import React from 'react';

export default function Photo(
        {pageUrl, url, title}: {[key : string] : string}): React.Element {
    return <div className="mb-photo" >
        <img className="mb-photo__image" src={url}
             alt={`Image titled "${title}"`}/>
        <div className="mb-photo__overlay">
            <h3 className="mb-photo__overlay__title">{title}</h3>
            <a className="mb-photo__overlay__flickr-link" href={pageUrl}
                 title="Flickr Page">Fl</a>
        </div>
    </div>;
}

/* @flow */

import React from 'react';
import type { Photo } from 'staircase/features';

export default function Photos({photos} : {photos : Photo[]}) : React.Element {
    return <div id="photos">
        <ul>
            {photos.map((p) =>
                <SinglePhoto key={p.id} {...p} />
            )}
        </ul>
    </div>;
}

function SinglePhoto({id, pageUrl, url}
        : {[key : string] : string}) : React.Element {
    return <li><div className="imagecontainer" >
        <img src={url} alt={`Image titled "${id}"`}/>
        <div className="overlay">
           <h3 className="phototitle">{id}</h3>
           <a href={pageUrl} title="Flickr Page">Fl&#8594;</a>
        </div>
    </div></li>;
}

/* @flow */

import React from 'react';

export default function RightSide({ contentHtml, photos }: {
        contentHtml : string, photos: React.Element }) : React.Element {
    return <div className="mb-rightside">
        <div className="mb-content"
             dangerouslySetInnerHTML={{ __html: contentHtml }} />
        {photos}
    </div>;
}

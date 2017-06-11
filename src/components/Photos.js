/* @flow */

import React from 'react';
import type { Photo } from 'staircase-generator/features';
import SinglePhoto from './Photo';

export default function Photos({photos} : {photos : Photo[]}) : React.Element {
    return <div className="mb-photos">
        <ul>
            {photos.map((p) =>
                <li><SinglePhoto key={p.id} {...p} /></li>
            )}
        </ul>
    </div>;
}


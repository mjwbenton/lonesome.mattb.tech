/* @flow */

import React from 'react';
import type { NavigationEntry } from 'staircase/features';

export default function Navigation({navigation}
        : {navigation : NavigationEntry[] }) : React.Element {
    return <ul>
        {navigation.map((ne) =>
            <li key={ne.path}><a href={`/${ne.path}`}>{ne.title}</a></li>
        )}
    </ul>;
}

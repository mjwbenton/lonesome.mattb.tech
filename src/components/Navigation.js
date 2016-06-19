/* @flow */

import React from 'react';
import type { NavigationEntry } from 'staircase/features';

export default function Navigation({navigation}
        : {navigation : NavigationEntry[] }) : React.Element {
    return <div id="navigation">
        <div id="navigation-sticky">
            <ul>
                {navigation.map((ne) =>
                    <li key={ne.path}>
                        <a className="navigation-link" href={`/${ne.path}`}>
                            {ne.title}
                        </a>
                    </li>
                )}
            </ul>
            <ul id="navigation-other">
                <li>
                    <a href="http://blog.mattbenton.co.uk"
                            className="navigation-link">
                        Stream
                    </a>
                    &nbsp;To <a href="http://blog.mattbenton.co.uk">
                        blog.mattbenton.co.uk</a> &#8594;
                </li>
            </ul>
        </div>
    </div>;
}

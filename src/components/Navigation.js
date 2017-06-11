/* @flow */

import React from 'react';
import type { NavigationEntry } from 'staircase-generator/features';

export default function Navigation({navigation}
        : {navigation : NavigationEntry[] }) : React.Element {
    return <div className="mb-navigation">
        <ul className="mb-navigation__main">
            {navigation.map((ne) =>
                <li key={ne.path} className="mb-navigation__item">
                    <a href={`/${ne.path}`}
                            className="mb-navigation__link">
                        {ne.title}
                    </a>
                </li>
            )}
        </ul>
        <ul className="mb-navigation__other">
            <li className="mb-navigation__item">
                <a href="http://blog.mattbenton.co.uk"
                        className="mb-navigation__link">
                    Stream
                </a>
                &nbsp;To <a href="http://blog.mattbenton.co.uk">
                    blog.mattbenton.co.uk</a> &#8594;
            </li>
        </ul>
    </div>;
}

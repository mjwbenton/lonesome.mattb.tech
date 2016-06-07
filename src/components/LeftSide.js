/* @flow */

import React from 'react';


export default function LeftSide({ children }
        : { children : React.Element }) : React.Element {
    return <div id="leftside">
        <div id="logo">
            <a href="/">
                Matthew<br/>
                Benton
            </a>
        </div>
        {children}
    </div>;
}

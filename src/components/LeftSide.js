/* @flow */

import React from 'react';

export default function LeftSide({ children }
        : { children : React.Element }) : React.Element {
    return <div className="mb-leftside">
        <a href="/" className="mb-leftside__logo">
            Matthew<br/>
            Benton
        </a>
        {children}
    </div>;
}

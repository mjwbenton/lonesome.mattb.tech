import * as React from 'react';

const LeftSide: React.SFC<{}> = ({ children }) => {
    return <div className="mb-leftside">
        <a href="/" className="mb-leftside__logo">
            Matthew<br/>
            Benton
        </a>
        {children}
    </div>;
}
export default LeftSide;

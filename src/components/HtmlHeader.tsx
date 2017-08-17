import * as React from 'react';

const HtmlHeader: React.SFC<{}> = () => {
    return <head>
        <title>Matthew Benton Photographer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/style.css" />
        <link rel="stylesheet"
                href="https://media.mattbenton.co.uk/font/trend-font-kit.css" />
    </head>;
}
export default HtmlHeader;

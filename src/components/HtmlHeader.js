/* @flow */

import React from 'react';

const CDN_PREFIX = '//cdnjs.cloudflare.com/ajax/libs/';
const WAYPOINTS = `${CDN_PREFIX}waypoints/2.0.5/waypoints.min.js`;
const JQUERY = `${CDN_PREFIX}jquery/2.1.1/jquery.min.js`;
const WAYPOINTS_STICKY = CDN_PREFIX
        + 'waypoints/2.0.5/shortcuts/sticky-elements/waypoints-sticky.min.js';

const JS = '$(function() { $("#navigation-sticky").waypoint("sticky"); });';

export default function HtmlHeader() : React.Element {
    return <head>
        <title>Matthew Benton Photographer</title>
        <link rel="stylesheet" href="/style.css" />
        <link rel="stylesheet"
                href="https://media.mattbenton.co.uk/font/trend-font-kit.css" />
        <script type="text/javascript" src={JQUERY} />
        <script type="text/javascript" src={WAYPOINTS} />
        <script type="text/javascript" src={WAYPOINTS_STICKY} />
        <script dangerouslySetInnerHTML={{ __html: JS }}></script>
    </head>;
}

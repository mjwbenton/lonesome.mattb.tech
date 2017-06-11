/* @flow */

import React from 'react';
import HtmlHeader from './HtmlHeader';
import Navigation from './Navigation';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import Photos from './Photos';
import type { ContentItem, Site } from 'staircase-generator';
import { NAVIGATION_META_KEY, PHOTOS_META_KEY }
        from 'staircase-generator/features';

export default function Page({item, site}
        : {item : ContentItem, site : Site}) : React.Element {
    const photos = item.meta[PHOTOS_META_KEY]
        ? <Photos photos={item.meta[PHOTOS_META_KEY]} /> : '';
    return <html>
        <HtmlHeader />
        <body>
            <LeftSide>
                <Navigation navigation={site.getMeta(NAVIGATION_META_KEY)} />
            </LeftSide>
            <RightSide contentHtml={item.content} photos={photos} />
        </body>
    </html>;
}

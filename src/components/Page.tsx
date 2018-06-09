import * as React from 'react';
import HtmlHeader from './HtmlHeader';
import Navigation from './Navigation';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import Photos from './Photos';
import { ContentItem, Site } from 'staircase-generator';
import { NAVIGATION_META_KEY, PHOTOS_META_KEY }
        from 'staircase-generator/features';

const Page: React.SFC<{item: ContentItem, site: Site}> = ({item, site}) => {
    const photos = item.meta[PHOTOS_META_KEY]
        ? <Photos photos={item.meta[PHOTOS_META_KEY]} /> : '';
    return <html>
        <HtmlHeader />
        <body>
            <LeftSide>
                <Navigation navigation={site.getMeta(NAVIGATION_META_KEY)} />
            </LeftSide>
            <RightSide contentHtml={item.content} photos={photos} />
            <script dangerouslySetInnerHTML={createScript()}>
            </script>
        </body>
    </html>;
};

function createScript() {
    return { __html: `
        const elements = document.getElementsByTagName("img")
        for(let i = 0; i < elements.length; i++) {
            elements[i].addEventListener("click", (_e) => {
                elements[i].classList.remove("animation-image-clicked"); 
                setTimeout(() => elements[i].classList.add("animation-image-clicked"), 10);
            });
        }
    `};
}
export default Page;

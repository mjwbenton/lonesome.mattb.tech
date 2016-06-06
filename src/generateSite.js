/* @flow */

import {
    handleFrontMatter, handleMarkdown, wrapReact, addDoctype
} from 'staircase/transforms';
import { buildNavigation, buildFlickrSet } from 'staircase/features';
import { readSiteFromPath, compose, setupDefaultLogger, getLogger }
        from 'staircase';
import Page from './components/Page';

setupDefaultLogger();

async function generateSite() {
    getLogger('main').info('Starting Generation');
    try {
        const site = await readSiteFromPath('./content');
        const transformedSite = await compose(
            handleFrontMatter,
            buildNavigation,
            buildFlickrSet('ad7d7f87cbe5cdf41c1fe66808d5cc7d'),
            handleMarkdown,
            wrapReact(Page),
            addDoctype
        )(site);
        await transformedSite.writeToPath('./output');
    } catch (err) {
        console.error(`Error generating site: ${err}`);
        throw err;
    }
}
generateSite();

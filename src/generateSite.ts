import {
    handleFrontMatter, handleMarkdown, wrapReact, addDoctype
} from 'staircase-generator/transforms';
import { buildNavigation, buildFlickrSet } from 'staircase-generator/features';
import { readSiteFromPath, compose, setupDefaultLogger, getLogger }
        from 'staircase-generator';
import Page from './components/Page';
import * as dotenv from 'dotenv';

dotenv.config();
setupDefaultLogger();

function getFlickrApiKey(): string {
    const flickrApiKey: string | undefined = process.env.FLICKR_API_KEY;
    if (!flickrApiKey) {
        throw new Error('Missing FLICKR_API_KEY env variable');
    }
    return flickrApiKey;
}

async function generateSite() {
    const log = getLogger('main');
    log.info('Starting Generation');
    try {
        const site = await readSiteFromPath('./content');
        const transformedSite = await compose(
            handleFrontMatter,
            buildNavigation,
            buildFlickrSet(getFlickrApiKey()),
            handleMarkdown,
            wrapReact(Page),
            addDoctype
        )(site);
        await transformedSite.writeToPath('./output');
    } catch (err) {
        console.error(`Error generating site: ${err}`);
        throw err;
    }
    log.info('Finished Generation');
}
generateSite();

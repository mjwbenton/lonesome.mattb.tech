# mattb.tech

My personal website.

## Plans

- Allow frontmatter to define a single, or multiple, data fetchers
- mdx-data-fetching should read that frontmatter and generate a getStaticProps method that calls the data fetchers and merges the props together
- Use a babel plugin that removes getStaticProps from layoutProps (see https://github.com/vercel/next.js/issues/12053)
- data fetchers receieve all the stuff that's in frontmatter
- export all of frontmatter from the page, use this to get the page title working properly
- use apollo client to fetch stuff from the graphql API in the data fetchers
- the \_app.tsx puts the pageProps into context so that they can be pulled out by MDX components later on
- Make spotify / github repos / flickr / everything else components that can pull out of that context

## TODO Post Next

- React strict mode
- Typescript strict mode
- Cypress tests
- themeify other values?
- cache ttl for files
- dark theme (use next-themes)
- Set title for every page
- Set meta description for every page
- Lighthouse testing

## Testing List

- Page Types
  - Playlist (e.g. http://localhost:3000/playlist/2018.html)
  - Markdown (e.g. http://localhost:3000/keyboard/niu-mini.html)
  - Code: Components (i.e. http://localhost:3000/code/components.html)
  - Code: Github (i.e. http://localhost:3000/code/github.html)
  - Reading (i.e. http://localhost:3000/reading.html)
  - Photos (e.g. http://localhost:3000/photos/rome.html)
  - Photos: Timers (i.e. http://localhost:3000/instant-timer.html)
  - Photos: Stream (i.e. http://localhost:3000/stream.html)
- Specific features
  - Code display (e.g. http://localhost:3000/keyboard/first-build.html)
  - Inline code display (e.g. http://localhost:3000/keyboard/yd60ble.html)

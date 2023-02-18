const BASE_URL = "https://lonesome.mattb.tech";

module.exports = [
  "/",
  "/photos/rome",
  "/instant-timer",
  "/stream",
  "/keyboard/first-build",
  "/playlist/2020",
  "/reading",
  "/code/repositories",
].map((url) => BASE_URL.concat(url));

const BASE_URL = "http://localhost:3001";

module.exports = [
  "/",
  "/photos/rome",
  "/instant-timer",
  "/stream",
  "/keyboard/first-build",
  "/playlist/2020",
  "/reading",
  "/code/github",
  "/code/components",
].map((url) => BASE_URL.concat(url));

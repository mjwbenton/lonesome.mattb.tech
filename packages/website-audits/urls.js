const BASE_URL = "https://share.mattb.tech";

module.exports = ["/photos/rome", "/photos/stream", "/playlist/2020"].map(
  (url) => BASE_URL.concat(url)
);

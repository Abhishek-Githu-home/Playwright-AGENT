// BASE_URL defaults to the local demo storefront (mock-site) that ships in this
// repo, because this sandbox's network policy blocks amazon.in / flipkart.com.
// From an environment with real internet access, run with:
//   BASE_URL=https://www.amazon.in npm run test:amazon
// (selectors would need adjusting to match the live DOM; the well-known IDs
// used across this suite, e.g. #twotabsearchtextbox, mirror Amazon's real ones).
const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4173';

module.exports = { BASE_URL };

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    images: {
      domains: ['lh3.googleusercontent.com'], // replace with the domain of your image source
    },
  };



export default config;

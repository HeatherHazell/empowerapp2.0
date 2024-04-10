//SUMMARY - it sets up the configuration for Sentry in a Next.js application

//Importing the withSentryConfig function from the @sentry/nextjs package. This function is used to configure 
//Sentry for Next.js applications.
import {withSentryConfig} from '@sentry/nextjs';
//This is a JSDoc comment that provides type information for the nextConfig variable. It specifies that nextConfig 
//is an object that conforms to the NextConfig type defined in the next module.
/** @type {import('next').NextConfig} */
//Initializing an empty object named nextConfig. This object will be used to configure Next.js.
const nextConfig = {};
//Calling the withSentryConfig function and passing nextConfig as the first argument. This function wraps the Next.js configuration with Sentry-specific configuration options.
//The configuration options for Sentry are passed as the second argument. These options include settings for configuring Sentry error tracking and reporting in a Next.js application.
export default withSentryConfig(nextConfig, {
// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options

// Suppresses source map uploading logs during build
silent: true,
org: "team-se",
project: "heather-nextjs",
}, {
// For all available options, see:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// Upload a larger set of source maps for prettier stack traces (increases build time)
widenClientFileUpload: true,

// Transpiles SDK to be compatible with IE11 (increases bundle size)
transpileClientSDK: true,

// Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers. (increases server load)
// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
// side errors will fail.
// tunnelRoute: "https://o88872.ingest.us.sentry.io/api/2aaa3ad3ba5ea01c289d2297fd91be88/envelope/?sentry_key=2aaa3ad3ba5ea01c289d2297fd91be88/",

// Hides source maps from generated client bundles
hideSourceMaps: true,

// Automatically tree-shake Sentry logger statements to reduce bundle size
disableLogger: true,

// Enables automatic instrumentation of Vercel Cron Monitors.
// See the following for more information:
// https://docs.sentry.io/product/crons/
// https://vercel.com/docs/cron-jobs
automaticVercelMonitors: true,
});

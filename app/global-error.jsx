"use client";
import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";
import { useEffect } from "react";
export default function GlobalError({ error }) {
  //Using the useEffect hook to capture the error using Sentry's captureException method when the error prop changes.
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        {/* This is the default Next.js error component. */}
        <NextError />
      </body>
    </html>
  );
}

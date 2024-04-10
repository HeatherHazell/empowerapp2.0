//In summary, this code defines a custom error component (CustomErrorComponent) for handling and displaying error pages in a Next.js application. 
//It integrates with Sentry for error tracking and captures errors using the getInitialProps method before rendering the error page.

//Importing the Sentry module from "@sentry/nextjs". This module provides integration with 
//Sentry for error tracking in Next.js applications.
import * as Sentry from "@sentry/nextjs";
//Importing the Error component from the "next/error" module. This component is used to display custom error pages in Next.js applications.
import Error from "next/error";
//Defining a functional component named CustomErrorComponent that takes props as input and returns the Error component with a specified statusCode. 
//This component will be used to display custom error pages in the application.
const CustomErrorComponent = (props) => {
  return <Error statusCode={props.statusCode} />;
};
//Adding a getInitialProps method to the CustomErrorComponent component. This method is used to asynchronously fetch data or perform operations before 
//rendering the component. In this case, it captures any errors that occur using Sentry's captureUnderscoreErrorException method.
CustomErrorComponent.getInitialProps = async (contextData) => {
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  await Sentry.captureUnderscoreErrorException(contextData);

  // This will contain the status code of the response - Returning the result of calling the getInitialProps method of the Error component with the provided 
  //contextData. This method retrieves the status code of the response, which will be used to render the appropriate error page.
  return Error.getInitialProps(contextData);
};
//Exporting the CustomErrorComponent component as the default export of the module.
export default CustomErrorComponent;

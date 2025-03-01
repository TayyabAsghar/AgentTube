if (!process.env.CLERK_ISSUE_URL)
  throw new Error("Clerk Issue Url is not set in environment variable.");

const authConfig = {
  providers: [
    {
      domain: process.env.CLERK_ISSUE_URL,
      applicationID: "convex",
    },
  ],
};

export default authConfig;

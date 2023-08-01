const UNKNOWN_HEADER = "unknown";

export enum Platform {
  ANDROID = "Android",
  iOS = "iOS",
  WEB = "Web"
}

export type BaseContext = {
    authToken?: string;
    appName: string;
    appVersion: string;
    platform: Platform;
    userAgent: string;
    mobileApiVersion: string;
}

// Can't find the type for the args?
const contextBuilder = async ({req}: any): Promise<BaseContext> => {
  const authToken: string | null = req.headers["authorization"];
  const context: BaseContext = {
    appName: req.headers["app-name"] ?? "FHL",
    appVersion: req.headers["app-version"] ?? UNKNOWN_HEADER,
    platform: req.headers["platform"] ?? UNKNOWN_HEADER,
    userAgent: req.headers["user-agent"] ?? UNKNOWN_HEADER,
    mobileApiVersion: "1.0", // TODO get the version from package.json
  };

  if (authToken) {
    context.authToken = authToken;
  }
  return context;
};

export {contextBuilder};

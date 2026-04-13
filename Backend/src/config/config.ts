type CONFIG = {
  readonly GOOGLE_API_KEY: string;
  readonly MISTRAL_API_KEY: string;
  readonly COHERE_API_KEY: string;
  readonly GOOGLE_CLIENT_ID: string;
  readonly GOOGLE_CLIENT_SECRET: string;
  readonly GOOGLE_CALLBACK_URL: string;
  readonly JWT_SECRET: string;
  readonly MONGO_URI: string;
  readonly FRONTEND_URL: string;
};

const config: CONFIG = {
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || "",
  MISTRAL_API_KEY: process.env.MISTRAL_API_KEY || "",
  COHERE_API_KEY: process.env.COHERE_API_KEY || "",
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
  MONGO_URI: process.env.MONGO_URI || "",
  FRONTEND_URL: process.env.FRONTEND_URL || "",
};

export default config;

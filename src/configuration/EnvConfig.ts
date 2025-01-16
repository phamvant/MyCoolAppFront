interface TConfig {
  BACKEND_URL: string | undefined;
}

let configuration;

const configDev: TConfig = {
  BACKEND_URL: process.env.BACKEND_URL_DEV ?? "http://localhost:8080/api/v1",
};

const configPro: TConfig = {
  BACKEND_URL: process.env.BACKEND_URL,
};

if (process.env.ENV === "development") {
  configuration = configDev;
} else if (process.env.ENV === "production") {
  configuration = configPro;
}

export default configuration as TConfig;

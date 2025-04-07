interface TConfig {
  BACKEND_URL: string | undefined;
}

let configuration;

const configDev: TConfig = {
  BACKEND_URL:
    import.meta.env.VITE_BACKEND_URL_DEV ?? "http://localhost:8080/api/v1",
};

const configPro: TConfig = {
  BACKEND_URL:
    import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8080/api/v1",
};

if (import.meta.env.VITE_ENV === "development") {
  configuration = configDev;
} else if (import.meta.env.VITE_ENV === "production") {
  configuration = configPro;
}

export default configuration as TConfig;

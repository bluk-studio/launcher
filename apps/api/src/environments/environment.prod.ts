export const environment = {
  production: true,
  siteUrl: "https://apis.odzi.dog",
  globalPrefix: "/bluk/launcher/v1",
  mongoUrl: "mongodb+srv://bluk-launcher:w4QeQZgg5eJSK8NK@cluster0.03jyp.mongodb.net/bluk-launcher?retryWrites=true&w=majority",
  authorization: {
    apiUrl: "https://ory-public.k8s.odzi.dog",
    jwtSecret: "prod-secret",
    allowedOrigins: [
      "localhost"
    ]
  }
};

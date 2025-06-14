const config = {
    appName: "Quillminds",
    appDescription:
      "Quillminds is a platform for teachers to create and share lesson plans.",
    domainName:
      process.env.NODE_ENV === "development"
        ? "http://localhost:8000"
        : "https://election-app-production.up.railway.app",
  };
  
  export default config;
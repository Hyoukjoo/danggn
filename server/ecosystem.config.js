module.exports = {
  apps: [
    {
      name: "danggn_server",
      script: "build/app.js",
      env_production: {
        "PORT": 5000,
        "NODE_ENV": "production",
      }
    }
  ]
}
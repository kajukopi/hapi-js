require("dotenv").config()
const Hapi = require("@hapi/hapi")
const config = require("./config/config")
const Vision = require("@hapi/vision")
const mongoose = require("mongoose")
const http = require("http")

;(async function init() {
  const server = Hapi.server({
    port: config.PORT,
    autoListen: true,
  })

  await server.register(Vision)

  server.views({
    engines: {
      hbs: require("handlebars"),
    },
    relativeTo: __dirname,
    path: "views",
    layout: true,
    layoutPath: "views/layout",
  })

  // Register routes
  const userRoutes = require("./routes/userRoutes")
  const assetRoutes = require("./routes/assetRoutes")
  const serviceRoutes = require("./routes/serviceRoutes")

  server.route(userRoutes)
  server.route(assetRoutes)
  server.route(serviceRoutes)

  server.events.on("log", (event, tags) => {
    if (tags.error) {
      console.log(event)
    }
  })

  server.log(["test", "error"], "Test event")

  await mongoose.connect(config.DATABASE_URL)

  return server
})()
  .then(async (server) => {
    await server.initialize()
    const port = config.normalizePort(config.PORT)
    const httpServer = http.createServer(server.listener)

    httpServer.listen(port, "0.0.0.0", () => {
      const addr = server.listener.address()
      const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port
      console.log("App started. Listening on " + bind)
    })

    httpServer.on("error", config.onError)

    await server.start()
  })
  .catch((err) => {
    console.error("Failed to start the server:", err)
    process.exit(1)
  })
